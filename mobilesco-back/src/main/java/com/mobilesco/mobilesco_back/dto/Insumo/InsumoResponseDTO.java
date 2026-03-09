package com.mobilesco.mobilesco_back.dto.Insumo;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InsumoResponseDTO {

    private Long id;
    private String nombre;
    private String descripcion;

    private Long unidadBaseId;
    private String unidadBaseNombre;

    private Boolean activo;

    private LocalDateTime fechaRegistro;

}