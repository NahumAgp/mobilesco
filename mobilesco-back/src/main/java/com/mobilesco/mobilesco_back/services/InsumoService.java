package com.mobilesco.mobilesco_back.services;

import java.util.List;

import com.mobilesco.mobilesco_back.dto.Insumo.InsumoCreateDTO;
import com.mobilesco.mobilesco_back.dto.Insumo.InsumoResponseDTO;
import com.mobilesco.mobilesco_back.dto.Insumo.InsumoUpdateDTO;

public interface InsumoService {

    InsumoResponseDTO crear(InsumoCreateDTO dto);

    List<InsumoResponseDTO> listar();

    InsumoResponseDTO obtenerPorId(Long id);

    InsumoResponseDTO actualizar(Long id, InsumoUpdateDTO dto);

    void eliminar(Long id);
}