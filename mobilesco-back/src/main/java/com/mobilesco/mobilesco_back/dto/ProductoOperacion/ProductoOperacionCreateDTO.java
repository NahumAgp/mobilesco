package com.mobilesco.mobilesco_back.dto.ProductoOperacion;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;  // 🔴 IMPORTAR ESTO

@Data
@NoArgsConstructor  // 🔴 AGREGAR ESTO
@AllArgsConstructor // 🔴 OPCIONAL PERO RECOMENDADO
public class ProductoOperacionCreateDTO {

    @NotNull(message = "La operación es obligatoria")
    private Long operacionId;

    @Positive(message = "La cantidad debe ser mayor a 0")
    private Integer cantidad = 1;

    @NotNull(message = "El tiempo es obligatorio")
    @Positive(message = "El tiempo debe ser mayor a 0")
    private Double tiempoMinutos;

    @NotNull(message = "El orden es obligatorio")
    @PositiveOrZero(message = "El orden debe ser 0 o mayor")
    private Integer orden;

    private String observaciones;
}