package com.mobilesco.mobilesco_back.services.Impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.mobilesco.mobilesco_back.dto.Familia.FamiliaCreateDTO;
import com.mobilesco.mobilesco_back.dto.Familia.FamiliaResponseDTO;
import com.mobilesco.mobilesco_back.dto.Familia.FamiliaUpdateDTO;
import com.mobilesco.mobilesco_back.models.FamiliaModel;
import com.mobilesco.mobilesco_back.repositories.FamiliaRepository;
import com.mobilesco.mobilesco_back.services.FamiliaService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FamiliaServiceImpl implements FamiliaService {

    private final FamiliaRepository familiaRepository;

    @Override
    public FamiliaResponseDTO crear(FamiliaCreateDTO dto) {

        validarDuplicado(dto.getNombre(), dto.getPadreId());

        FamiliaModel familia = new FamiliaModel();

        familia.setNombre(dto.getNombre());
        familia.setDescripcion(dto.getDescripcion());

        if (dto.getPadreId() != null) {
            FamiliaModel padre = familiaRepository.findById(dto.getPadreId())
                    .orElseThrow(() -> new RuntimeException("Familia padre no encontrada"));

            familia.setPadre(padre);
        }

        return mapToResponse(familiaRepository.save(familia));
    }

    @Override
    public FamiliaResponseDTO actualizar(Long id, FamiliaUpdateDTO dto) {

        FamiliaModel familia = familiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Familia no encontrada"));

        validarDuplicado(dto.getNombre(), dto.getPadreId());

        familia.setNombre(dto.getNombre());
        familia.setDescripcion(dto.getDescripcion());

        if (dto.getActivo() != null) {
            familia.setActivo(dto.getActivo());
        }

        if (dto.getPadreId() != null) {

            if (dto.getPadreId().equals(id)) {
                throw new RuntimeException("Una familia no puede ser su propio padre");
            }

            FamiliaModel padre = familiaRepository.findById(dto.getPadreId())
                    .orElseThrow(() -> new RuntimeException("Familia padre no encontrada"));

            familia.setPadre(padre);
        } else {
            familia.setPadre(null);
        }

        return mapToResponse(familiaRepository.save(familia));
    }

    @Override
    public FamiliaResponseDTO obtenerPorId(Long id) {

        FamiliaModel familia = familiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Familia no encontrada"));

        return mapToResponse(familia);
    }

    @Override
    public List<FamiliaResponseDTO> listar() {

        return familiaRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<FamiliaResponseDTO> listarActivas() {

        return familiaRepository.findByActivoTrueOrderByNombreAsc()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void eliminar(Long id) {

        FamiliaModel familia = familiaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Familia no encontrada"));

        familia.setActivo(false);

        familiaRepository.save(familia);
    }

    private void validarDuplicado(String nombre, Long padreId) {

        boolean existe;

        if (padreId == null) {
            existe = familiaRepository.existsByNombreIgnoreCaseAndPadreIsNull(nombre);
        } else {
            existe = familiaRepository.existsByNombreIgnoreCaseAndPadre_Id(nombre, padreId);
        }

        if (existe) {
            throw new RuntimeException("Ya existe una familia con ese nombre en el mismo nivel");
        }
    }

    private FamiliaResponseDTO mapToResponse(FamiliaModel familia) {

        FamiliaResponseDTO dto = new FamiliaResponseDTO();

        dto.setId(familia.getId());
        dto.setNombre(familia.getNombre());
        dto.setDescripcion(familia.getDescripcion());
        dto.setActivo(familia.getActivo());
        dto.setFechaRegistro(familia.getFechaRegistro());
        dto.setFechaActualizacion(familia.getFechaActualizacion());

        if (familia.getPadre() != null) {
            dto.setPadreId(familia.getPadre().getId());
            dto.setPadreNombre(familia.getPadre().getNombre());
        }

        return dto;
    }
}
