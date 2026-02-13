package com.mobilesco.mobilesco_back.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mobilesco.mobilesco_back.dto.proveedor.ProveedorCreateDTO;
import com.mobilesco.mobilesco_back.dto.proveedor.ProveedorResponseDTO;
import com.mobilesco.mobilesco_back.dto.proveedor.ProveedorUpdateDTO;
import com.mobilesco.mobilesco_back.models.ProveedorModel;
import com.mobilesco.mobilesco_back.repositories.ProveedorRepository;

@Service
public class ProveedorService {

    @Autowired
    private ProveedorRepository proveedorRepository;

    // --------- Mapper Entity -> DTO ---------
    private ProveedorResponseDTO mapToResponseDTO(ProveedorModel proveedor) {
        ProveedorResponseDTO dto = new ProveedorResponseDTO();
        dto.setId(proveedor.getId());
        dto.setRazonSocial(proveedor.getRazonSocial());
        dto.setRfc(proveedor.getRfc());
        dto.setNombre(proveedor.getNombre());
        dto.setDireccion(proveedor.getDireccion());
        dto.setTelefono(proveedor.getTelefono());
        dto.setCorreo(proveedor.getCorreo());
        dto.setFechaRegistro(proveedor.getFechaRegistro());
        dto.setFechaUltimoContacto(proveedor.getFechaUltimoContacto()); 
        dto.setActivo(proveedor.getActivo());
        return dto;
    }

    private List<ProveedorResponseDTO> mapToResponseDTOList(List<ProveedorModel> proveedores) {
        return proveedores.stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    // --------- CREATE ---------
    public ProveedorResponseDTO crear( ProveedorCreateDTO dto) {
        ProveedorModel proveedor = new ProveedorModel();
        proveedor.setRazonSocial(dto.getRazonSocial());
        proveedor.setRfc(dto.getRfc());
        proveedor.setNombre(dto.getNombre());
        proveedor.setDireccion(dto.getDireccion());
        proveedor.setTelefono(dto.getTelefono());
        proveedor.setCorreo(dto.getCorreo());
        proveedor.setActivo(true); // regla: nuevo proveedor inicia activo

        ProveedorModel guardado = proveedorRepository.save(proveedor);
        return mapToResponseDTO(guardado);
    }

    // --------- READ ---------
    public List<ProveedorResponseDTO> obtenerTodos() {
        return mapToResponseDTOList(proveedorRepository.findAll());
    }

    public Optional<ProveedorResponseDTO> obtenerPorId(Long id) {
        return proveedorRepository.findById(id).map(this::mapToResponseDTO);
    }

    public List<ProveedorResponseDTO> buscarPorActivo(Boolean activo) {
        return mapToResponseDTOList(proveedorRepository.findByActivo(activo));
    }

    public List<ProveedorResponseDTO> buscarPorNombre(String nombre) {
        return mapToResponseDTOList(proveedorRepository.findByNombreContainingIgnoreCase(nombre));
    }
    
    public List<ProveedorResponseDTO> buscarPorActivoYNombre(Boolean activo, String nombre) {
        return mapToResponseDTOList(proveedorRepository.findByActivoAndNombreContainingIgnoreCase(activo, nombre));
    }

    // --------- UPDATE ---------
    public Optional<ProveedorResponseDTO> actualizar(Long id, ProveedorUpdateDTO dto) {
        return proveedorRepository.findById(id).map(existente -> {
            existente.setRazonSocial(dto.getRazonSocial());
            existente.setRfc(dto.getRfc());
            existente.setNombre(dto.getNombre());
            existente.setDireccion(dto.getDireccion());
            existente.setTelefono(dto.getTelefono());
            existente.setCorreo(dto.getCorreo());
            existente.setFechaUltimoContacto(dto.getFechaUltimoContacto());
            existente.setActivo(dto.getActivo());
            // activo no se toca aquí (si quieres, hacemos un DTO específico para eso)

            ProveedorModel guardado = proveedorRepository.save(existente);
            return mapToResponseDTO(guardado);
        });
    }

    // --------- DELETE ---------
    public boolean eliminar(Long id) {
        if (!proveedorRepository.existsById(id)) return false;
        proveedorRepository.deleteById(id);
        return true;
    }

    public boolean desactivar(Long id) {
        return proveedorRepository.findById(id).map(proveedor -> {
            proveedor.setActivo(false);
            proveedorRepository.save(proveedor);
            return true;
        }).orElse(false);
    }

    public boolean activar(Long id) {
        return proveedorRepository.findById(id).map(proveedor -> {
            proveedor.setActivo(true);
            proveedorRepository.save(proveedor);
            return true;
        }).orElse(false);
    }

}
