package com.mobilesco.mobilesco_back.dto.Insumo;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class InsumoCreateDTO{

 @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    private String descripcion;

    @NotNull(message = "La unidad base es obligatoria")
    private Long unidadBaseId;
    
}