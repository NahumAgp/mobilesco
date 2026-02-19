package com.mobilesco.mobilesco_back.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mobilesco.mobilesco_back.dto.proveedor.ProveedorCreateDTO;
import com.mobilesco.mobilesco_back.dto.proveedor.ProveedorResponseDTO;
import com.mobilesco.mobilesco_back.dto.proveedor.ProveedorUpdateDTO;
import com.mobilesco.mobilesco_back.exception.DuplicateFieldException;
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
        //IDENTIDAD
        dto.setRazonSocial(proveedor.getRazonSocial());
        dto.setRfc(proveedor.getRfc());
        //NOMBRE
        dto.setNombre(proveedor.getNombre());
        dto.setApellidoPaterno(proveedor.getApellidoPaterno());
        dto.setApellidoMaterno(proveedor.getApellidoMaterno());
        //DIRECCION
        dto.setEstado(proveedor.getEstado());
        dto.setCiudad(proveedor.getCiudad());
        dto.setColonia(proveedor.getColonia());
        dto.setCalle(proveedor.getCalle());
        dto.setNumeroExterior(proveedor.getNumeroExterior());
        dto.setNumeroInterior(proveedor.getNumeroInterior());
        dto.setCodigoPostal(proveedor.getCodigoPostal());
        //CONTACTO
        dto.setTelefono(proveedor.getTelefono());
        dto.setCorreo(proveedor.getCorreo());
        //FECHAS
        dto.setFechaRegistro(proveedor.getFechaRegistro());
        dto.setFechaUltimoContacto(proveedor.getFechaUltimoContacto()); 
        //ESTADO
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
        proveedorRepository
        .findByRazonSocialIgnoreCase(dto.getRazonSocial())
        .ifPresent(p -> {
            throw new DuplicateFieldException(
                "razonSocial",
                "Ya existe un proveedor con esa razón social"
            );
        });
    
        ProveedorModel proveedor = new ProveedorModel();
        //IDENTIDAD
        proveedor.setRazonSocial(dto.getRazonSocial());
        proveedor.setRfc(dto.getRfc());
        //NOMBRE
        proveedor.setNombre(dto.getNombre());
        proveedor.setApellidoPaterno(dto.getApellidoPaterno());
        proveedor.setApellidoMaterno(dto.getApellidoMaterno());
        //DIRECCION
        proveedor.setEstado(dto.getEstado());
        proveedor.setCiudad(dto.getCiudad());
        proveedor.setColonia(dto.getColonia());
        proveedor.setCalle(dto.getCalle());
        proveedor.setNumeroExterior(dto.getNumeroExterior());
        proveedor.setNumeroInterior(dto.getNumeroInterior());
        proveedor.setCodigoPostal(dto.getCodigoPostal());
        //CONTACTO
        proveedor.setTelefono(dto.getTelefono());
        proveedor.setCorreo(dto.getCorreo());
        //ESTADO
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
        proveedorRepository
        .findByRazonSocialIgnoreCase(dto.getRazonSocial())
        .ifPresent(p -> {
            if (!p.getId().equals(id)) {
                throw new DuplicateFieldException(
                    "razonSocial",
                    "Ya existe un proveedor con esa razón social"
                );
            }
        });

        return proveedorRepository.findById(id).map(existente -> {
            //IDENTIDAD
            existente.setRazonSocial(dto.getRazonSocial());
            existente.setRfc(dto.getRfc());
            //NOMBRE
            existente.setNombre(dto.getNombre());
            existente.setApellidoPaterno(dto.getApellidoPaterno());
            existente.setApellidoMaterno(dto.getApellidoMaterno());
            //DIRECCION
            existente.setEstado(dto.getEstado());
            existente.setCiudad(dto.getCiudad());
            existente.setColonia(dto.getColonia());
            existente.setCalle(dto.getCalle());
            existente.setNumeroExterior(dto.getNumeroExterior());
            existente.setNumeroInterior(dto.getNumeroInterior());
            existente.setCodigoPostal(dto.getCodigoPostal());
            //CONTACTO
            existente.setTelefono(dto.getTelefono());
            existente.setCorreo(dto.getCorreo());
            //ESTADO
            existente.setActivo(dto.getActivo());

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
