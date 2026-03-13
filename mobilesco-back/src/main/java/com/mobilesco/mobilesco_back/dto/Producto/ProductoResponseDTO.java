package com.mobilesco.mobilesco_back.dto.Producto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductoResponseDTO {
    private Long id;
    private String sku;
    private String nombre;
    private String descripcion;
    
    // Catálogos
    private Long tipoProductoId;
    private String tipoProductoNombre;
    
    private Long lineaId;
    private String lineaNombre;
    
    private Long categoriaId;
    private String categoriaNombre;
    
    private Long materialId;
    private String materialNombre;
    
    private String caracteristicas;
    private String dimensiones;
    private Double pesoKg;
    private Boolean activo;
    private LocalDateTime fechaRegistro;
    private LocalDateTime fechaActualizacion;
    
    // Lista de insumos (BOM)
    private List<ProductoInsumoResponseDTO> insumos;
}