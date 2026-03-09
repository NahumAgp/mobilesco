package com.mobilesco.mobilesco_back.services;

import java.util.List;

import com.mobilesco.mobilesco_back.dto.Familia.FamiliaCreateDTO;
import com.mobilesco.mobilesco_back.dto.Familia.FamiliaResponseDTO;
import com.mobilesco.mobilesco_back.dto.Familia.FamiliaUpdateDTO;

public interface FamiliaService {

    FamiliaResponseDTO crear(FamiliaCreateDTO dto);

    FamiliaResponseDTO actualizar(Long id, FamiliaUpdateDTO dto);

    FamiliaResponseDTO obtenerPorId(Long id);

    List<FamiliaResponseDTO> listar();

    List<FamiliaResponseDTO> listarActivas();

    void eliminar(Long id);
}
