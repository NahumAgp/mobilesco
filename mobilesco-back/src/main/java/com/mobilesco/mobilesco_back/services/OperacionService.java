package com.mobilesco.mobilesco_back.services;

import com.mobilesco.mobilesco_back.dto.Operacion.OperacionCreateDTO;
import com.mobilesco.mobilesco_back.dto.Operacion.OperacionResponseDTO;
import com.mobilesco.mobilesco_back.dto.Operacion.OperacionUpdateDTO;
import com.mobilesco.mobilesco_back.models.OperacionModel;
import com.mobilesco.mobilesco_back.models.CentroTrabajoModel;
import com.mobilesco.mobilesco_back.repositories.OperacionRepository;
import com.mobilesco.mobilesco_back.repositories.CentroTrabajoRepository;
import com.mobilesco.mobilesco_back.exceptions.ResourceNotFoundException;
import com.mobilesco.mobilesco_back.exceptions.ValidationException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class OperacionService {

    private final OperacionRepository operacionRepository;
    private final CentroTrabajoRepository centroTrabajoRepository;  // Lo crearemos después

    @Transactional
    public OperacionResponseDTO crear(OperacionCreateDTO dto) {
        log.info("Creando nueva operación con código: {}", dto.getCodigo());

        // Validar código único
        if (operacionRepository.existsByCodigoIgnoreCase(dto.getCodigo())) {
            throw new ValidationException("Ya existe una operación con el código: " + dto.getCodigo());
        }

        // Buscar centro de trabajo si se proporcionó
        CentroTrabajoModel centroTrabajo = null;
        if (dto.getCentroTrabajoId() != null) {
            centroTrabajo = centroTrabajoRepository.findById(dto.getCentroTrabajoId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Centro de trabajo no encontrado con id: " + dto.getCentroTrabajoId()));
        }

        // Crear entidad
        OperacionModel operacion = OperacionModel.builder()
                .codigo(dto.getCodigo())
                .nombre(dto.getNombre())
                .descripcion(dto.getDescripcion())
                .centroTrabajo(centroTrabajo)
                .costoMinuto(dto.getCostoMinuto())
                .activo(true)
                .build();

        OperacionModel saved = operacionRepository.save(operacion);
        log.info("Operación creada con ID: {}", saved.getId());

        return mapToResponseDTO(saved);
    }

    @Transactional
    public OperacionResponseDTO actualizar(Long id, OperacionUpdateDTO dto) {
        log.info("Actualizando operación ID: {}", id);

        OperacionModel operacion = operacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Operación no encontrada con id: " + id));

        // Validar código único (excepto si es el mismo)
        if (!operacion.getCodigo().equalsIgnoreCase(dto.getCodigo()) &&
                operacionRepository.existsByCodigoIgnoreCase(dto.getCodigo())) {
            throw new ValidationException("Ya existe una operación con el código: " + dto.getCodigo());
        }

        // Actualizar centro de trabajo si cambió
        if (dto.getCentroTrabajoId() != null) {
            if (operacion.getCentroTrabajo() == null || 
                !operacion.getCentroTrabajo().getId().equals(dto.getCentroTrabajoId())) {
                
                CentroTrabajoModel centroTrabajo = centroTrabajoRepository.findById(dto.getCentroTrabajoId())
                        .orElseThrow(() -> new ResourceNotFoundException(
                                "Centro de trabajo no encontrado con id: " + dto.getCentroTrabajoId()));
                operacion.setCentroTrabajo(centroTrabajo);
            }
        } else {
            operacion.setCentroTrabajo(null);
        }

        // Actualizar campos
        operacion.setCodigo(dto.getCodigo());
        operacion.setNombre(dto.getNombre());
        operacion.setDescripcion(dto.getDescripcion());
        
        if (dto.getCostoMinuto() != null) {
            operacion.setCostoMinuto(dto.getCostoMinuto());
        }
        
        if (dto.getActivo() != null) {
            operacion.setActivo(dto.getActivo());
        }

        OperacionModel updated = operacionRepository.save(operacion);
        log.info("Operación actualizada");

        return mapToResponseDTO(updated);
    }

    @Transactional(readOnly = true)
    public OperacionResponseDTO obtenerPorId(Long id) {
        OperacionModel operacion = operacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Operación no encontrada con id: " + id));
        return mapToResponseDTO(operacion);
    }

    @Transactional(readOnly = true)
    public OperacionResponseDTO obtenerPorCodigo(String codigo) {
        OperacionModel operacion = operacionRepository.findByCodigo(codigo)
                .orElseThrow(() -> new ResourceNotFoundException("Operación no encontrada con código: " + codigo));
        return mapToResponseDTO(operacion);
    }

    @Transactional(readOnly = true)
    public List<OperacionResponseDTO> listar() {
        return operacionRepository.findAll()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<OperacionResponseDTO> listarActivos() {
        return operacionRepository.findByActivoTrue()
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<OperacionResponseDTO> buscar(String nombre) {
        return operacionRepository.buscarPorNombre(nombre)
                .stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public void eliminar(Long id) {
        log.info("Eliminando operación ID: {}", id);

        OperacionModel operacion = operacionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Operación no encontrada con id: " + id));

        operacion.setActivo(false);
        operacionRepository.save(operacion);
        log.info("Operación desactivada");
    }

    private OperacionResponseDTO mapToResponseDTO(OperacionModel operacion) {
        return OperacionResponseDTO.builder()
                .id(operacion.getId())
                .codigo(operacion.getCodigo())
                .nombre(operacion.getNombre())
                .descripcion(operacion.getDescripcion())
                .centroTrabajoId(operacion.getCentroTrabajo() != null ? 
                                 operacion.getCentroTrabajo().getId() : null)
                .centroTrabajoNombre(operacion.getCentroTrabajo() != null ? 
                                    operacion.getCentroTrabajo().getNombre() : null)
                .costoMinuto(operacion.getCostoMinuto())
                .costoHora(operacion.getCostoHora())
                .activo(operacion.getActivo())
                .fechaRegistro(operacion.getFechaRegistro())
                .fechaActualizacion(operacion.getFechaActualizacion())
                .build();
    }
}