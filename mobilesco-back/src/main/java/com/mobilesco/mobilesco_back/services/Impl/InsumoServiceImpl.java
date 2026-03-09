package com.mobilesco.mobilesco_back.services.Impl;



import java.util.List;

import org.springframework.stereotype.Service;

import com.mobilesco.mobilesco_back.dto.Insumo.InsumoCreateDTO;
import com.mobilesco.mobilesco_back.dto.Insumo.InsumoResponseDTO;
import com.mobilesco.mobilesco_back.dto.Insumo.InsumoUpdateDTO;
import com.mobilesco.mobilesco_back.repositories.InsumoRepository;
import com.mobilesco.mobilesco_back.repositories.UnidadMedidaRepository;
import com.mobilesco.mobilesco_back.services.InsumoService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class InsumoServiceImpl implements InsumoService {

    private final InsumoRepository insumoRepository;
    private final UnidadMedidaRepository unidadMedidaRepository;

    @Override
    public InsumoResponseDTO crear(InsumoCreateDTO dto) {
        return null;
    }

    @Override
    public List<InsumoResponseDTO> listar() {
        return null;
    }

    @Override
    public InsumoResponseDTO obtenerPorId(Long id) {
        return null;
    }

    @Override
    public InsumoResponseDTO actualizar(Long id, InsumoUpdateDTO dto) {
        return null;
    }

    @Override
    public void eliminar(Long id) {

    }
}