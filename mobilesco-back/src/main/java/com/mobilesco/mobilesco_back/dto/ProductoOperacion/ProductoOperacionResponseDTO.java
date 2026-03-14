package com.mobilesco.mobilesco_back.dto.ProductoOperacion;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductoOperacionResponseDTO {
    private Long id;
    
    // Producto
    private Long productoId;
    private String productoSku;
    private String productoNombre;
    
    // Operación
    private Long operacionId;
    private String operacionCodigo;
    private String operacionNombre;
    private Double costoMinutoOperacion;
    
    // Detalles de esta relación
    private Integer cantidad;              // 🔴 NUEVO: 2 cortes, 4 soldaduras, etc.
    private Double tiempoMinutos;           // Por cada vez
    private Integer orden;
    private String observaciones;
    private Boolean activo;
    
    // Campos calculados
    private Double tiempoTotalMinutos;      // cantidad * tiempoMinutos
    private Double costoTotal;              // tiempoTotal * costoMinutoOperacion
    
    private LocalDateTime fechaRegistro;
    private LocalDateTime fechaActualizacion;
}