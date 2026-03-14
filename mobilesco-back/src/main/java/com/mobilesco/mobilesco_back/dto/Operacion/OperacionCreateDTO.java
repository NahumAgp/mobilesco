package com.mobilesco.mobilesco_back.dto.Operacion;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class OperacionCreateDTO {
    
    @NotBlank(message = "El código es obligatorio")
    @Size(max = 20, message = "El código no puede exceder 20 caracteres")
    private String codigo;
    
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    private String nombre;
    
    @Size(max = 255, message = "La descripción no puede exceder 255 caracteres")
    private String descripcion;
    
    private Long centroTrabajoId;  // Opcional por ahora
    
    @NotNull(message = "El costo por minuto es obligatorio")
    @Positive(message = "El costo por minuto debe ser mayor a 0")
    private Double costoMinuto;
}