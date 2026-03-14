package com.mobilesco.mobilesco_back.services;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.mobilesco.mobilesco_back.dto.ProductoOperacion.ProductoOperacionCreateDTO;
import com.mobilesco.mobilesco_back.dto.ProductoOperacion.ProductoOperacionResponseDTO;
import com.mobilesco.mobilesco_back.exceptions.ResourceNotFoundException;
import com.mobilesco.mobilesco_back.exceptions.ValidationException;
import com.mobilesco.mobilesco_back.models.OperacionModel;
import com.mobilesco.mobilesco_back.models.ProductoModel;
import com.mobilesco.mobilesco_back.models.ProductoOperacionModel;
import com.mobilesco.mobilesco_back.repositories.OperacionRepository;
import com.mobilesco.mobilesco_back.repositories.ProductoOperacionRepository;
import com.mobilesco.mobilesco_back.repositories.ProductoRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class ProductoOperacionService {

    private final ProductoOperacionRepository productoOperacionRepository;
    private final ProductoRepository productoRepository;
    private final OperacionRepository operacionRepository;

    @Transactional
    public ProductoOperacionResponseDTO agregarOperacionAProducto(
            Long productoId, 
            ProductoOperacionCreateDTO dto) {
        
        log.info("Agregando operación a producto - Producto ID: {}, Operación ID: {}", 
                 productoId, dto.getOperacionId());
        
        ProductoModel producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
        
        OperacionModel operacion = operacionRepository.findById(dto.getOperacionId())
                .orElseThrow(() -> new ResourceNotFoundException("Operación no encontrada"));
        
        // Verificar si ya existe
        boolean existe = productoOperacionRepository.existsByProductoIdAndOperacionId(
                productoId, dto.getOperacionId());
        
        if (existe) {
            throw new ValidationException("La operación ya está agregada a este producto");
        }
        
        // Crear relación
        ProductoOperacionModel productoOperacion = ProductoOperacionModel.builder()
                .producto(producto)
                .operacion(operacion)
                .cantidad(dto.getCantidad() != null ? dto.getCantidad() : 1)
                .tiempoMinutos(dto.getTiempoMinutos())
                .orden(dto.getOrden())
                .observaciones(dto.getObservaciones())
                .activo(true)
                .build();
        
        ProductoOperacionModel saved = productoOperacionRepository.save(productoOperacion);
        log.info("Operación agregada correctamente");
        
        return mapToResponseDTO(saved);
    }

    @Transactional
    public List<ProductoOperacionResponseDTO> agregarOperacionesMasivo(
            Long productoId,
            List<ProductoOperacionCreateDTO> operacionesDTO) {
        
        log.info("Agregando {} operaciones al producto ID: {}", operacionesDTO.size(), productoId);
        
        ProductoModel producto = productoRepository.findById(productoId)
                .orElseThrow(() -> new ResourceNotFoundException("Producto no encontrado"));
        
        List<ProductoOperacionResponseDTO> resultados = new ArrayList<>();
        List<String> errores = new ArrayList<>();
        
        for (ProductoOperacionCreateDTO dto : operacionesDTO) {
            try {
                OperacionModel operacion = operacionRepository.findById(dto.getOperacionId())
                        .orElseThrow(() -> new ResourceNotFoundException(
                                "Operación no encontrada con id: " + dto.getOperacionId()));
                
                boolean existe = productoOperacionRepository.existsByProductoIdAndOperacionId(
                        productoId, dto.getOperacionId());
                
                if (existe) {
                    errores.add("La operación '" + operacion.getNombre() + "' ya está agregada");
                    continue;
                }
                
                ProductoOperacionModel productoOperacion = ProductoOperacionModel.builder()
                        .producto(producto)
                        .operacion(operacion)
                        .cantidad(dto.getCantidad() != null ? dto.getCantidad() : 1)
                        .tiempoMinutos(dto.getTiempoMinutos())
                        .orden(dto.getOrden())
                        .observaciones(dto.getObservaciones())
                        .activo(true)
                        .build();
                
                ProductoOperacionModel saved = productoOperacionRepository.save(productoOperacion);
                resultados.add(mapToResponseDTO(saved));
                
            } catch (Exception e) {
                errores.add("Error con operación ID " + dto.getOperacionId() + ": " + e.getMessage());
            }
        }
        
        if (!errores.isEmpty()) {
            log.warn("Se completó con errores: {}", errores);
            if (resultados.isEmpty()) {
                throw new ValidationException("No se pudo agregar ninguna operación: " + errores);
            }
        }
        
        log.info("Se agregaron {} operaciones correctamente", resultados.size());
        return resultados;
    }

    @Transactional(readOnly = true)
    public List<ProductoOperacionResponseDTO> listarPorProducto(Long productoId) {
        return productoOperacionRepository.findByProductoIdOrderByOrdenAsc(productoId)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void eliminarOperacionDeProducto(Long productoId, Long operacionId) {
        log.info("Eliminando operación de producto - Producto ID: {}, Operación ID: {}", 
                 productoId, operacionId);
        
        List<ProductoOperacionModel> items = productoOperacionRepository.findByProductoIdOrderByOrdenAsc(productoId);
        
        ProductoOperacionModel item = items.stream()
                .filter(i -> i.getOperacion().getId().equals(operacionId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException(
                        "La operación no está asociada a este producto"));
        
        productoOperacionRepository.delete(item);
        log.info("Operación eliminada correctamente");
    }

    @Transactional
    public void reordenarOperaciones(Long productoId, List<Long> operacionesIdsEnOrden) {
        log.info("Reordenando operaciones del producto ID: {}", productoId);
        
        List<ProductoOperacionModel> operaciones = productoOperacionRepository
                .findByProductoIdOrderByOrdenAsc(productoId);
        
        for (int i = 0; i < operacionesIdsEnOrden.size(); i++) {
            Long operacionId = operacionesIdsEnOrden.get(i);
            
            ProductoOperacionModel op = operaciones.stream()
                    .filter(o -> o.getOperacion().getId().equals(operacionId))
                    .findFirst()
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Operación no encontrada: " + operacionId));
            
            op.setOrden(i + 1);
            productoOperacionRepository.save(op);
        }
        
        log.info("Operaciones reordenadas correctamente");
    }

    private ProductoOperacionResponseDTO mapToResponseDTO(ProductoOperacionModel po) {
        return ProductoOperacionResponseDTO.builder()
                .id(po.getId())
                .productoId(po.getProducto().getId())
                .productoSku(po.getProducto().getSku())
                .productoNombre(po.getProducto().getNombre())
                .operacionId(po.getOperacion().getId())
                .operacionCodigo(po.getOperacion().getCodigo())
                .operacionNombre(po.getOperacion().getNombre())
                .costoMinutoOperacion(po.getOperacion().getCostoMinuto())
                .cantidad(po.getCantidad())
                .tiempoMinutos(po.getTiempoMinutos())
                .orden(po.getOrden())
                .observaciones(po.getObservaciones())
                .activo(po.getActivo())
                .tiempoTotalMinutos(po.getTiempoTotalMinutos())
                .costoTotal(po.getCostoTotalOperacion())
                .fechaRegistro(po.getFechaRegistro())
                .fechaActualizacion(po.getFechaActualizacion())
                .build();
    }
}