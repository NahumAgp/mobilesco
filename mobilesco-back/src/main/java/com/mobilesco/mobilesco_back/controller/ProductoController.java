package com.mobilesco.mobilesco_back.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mobilesco.mobilesco_back.dto.Producto.ProductoCreateDTO;
import com.mobilesco.mobilesco_back.dto.Producto.ProductoInsumoCreateDTO;
import com.mobilesco.mobilesco_back.dto.Producto.ProductoInsumoListaDTO;
import com.mobilesco.mobilesco_back.dto.Producto.ProductoInsumoResponseDTO;
import com.mobilesco.mobilesco_back.dto.Producto.ProductoResponseDTO;
import com.mobilesco.mobilesco_back.dto.Producto.ProductoUpdateDTO;
import com.mobilesco.mobilesco_back.services.ProductoInsumoService;
import com.mobilesco.mobilesco_back.services.ProductoService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "Productos", description = "CRUD y gestión de productos terminados")
@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoService productoService;
    private final ProductoInsumoService productoInsumoService;

    // =====================================================
    // CRUD DE PRODUCTOS
    // =====================================================

    @Operation(summary = "Crear nuevo producto")
    @PostMapping
    public ResponseEntity<ProductoResponseDTO> crear(@Valid @RequestBody ProductoCreateDTO dto) {
        return new ResponseEntity<>(productoService.crear(dto), HttpStatus.CREATED);
    }

    @Operation(summary = "Actualizar producto")
    @PutMapping("/{id}")
    public ResponseEntity<ProductoResponseDTO> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody ProductoUpdateDTO dto) {
        return ResponseEntity.ok(productoService.actualizar(id, dto));
    }

    @Operation(summary = "Obtener producto por ID")
    @GetMapping("/{id}")
    public ResponseEntity<ProductoResponseDTO> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.obtenerPorId(id));
    }

    @Operation(summary = "Obtener producto por SKU")
    @GetMapping("/sku/{sku}")
    public ResponseEntity<ProductoResponseDTO> obtenerPorSku(@PathVariable String sku) {
        return ResponseEntity.ok(productoService.obtenerPorSku(sku));
    }

    @Operation(summary = "Listar todos los productos")
    @GetMapping
    public ResponseEntity<List<ProductoResponseDTO>> listar() {
        return ResponseEntity.ok(productoService.listar());
    }

    @Operation(summary = "Listar productos activos")
    @GetMapping("/activos")
    public ResponseEntity<List<ProductoResponseDTO>> listarActivos() {
        return ResponseEntity.ok(productoService.listarActivos());
    }

    @Operation(summary = "Buscar productos por nombre")
    @GetMapping("/buscar")
    public ResponseEntity<List<ProductoResponseDTO>> buscar(@RequestParam String nombre) {
        return ResponseEntity.ok(productoService.buscar(nombre));
    }

    @Operation(summary = "Eliminar producto (desactivar)")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        productoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }

    // =====================================================
    // BOM (LISTA DE MATERIALES)
    // =====================================================

    @Operation(summary = "Agregar insumo a producto")
    @PostMapping("/{productoId}/insumos")
    public ResponseEntity<ProductoInsumoResponseDTO> agregarInsumo(
            @PathVariable Long productoId,
            @Valid @RequestBody ProductoInsumoCreateDTO dto) {
        return new ResponseEntity<>(
                productoInsumoService.agregarInsumoAProducto(productoId, dto),
                HttpStatus.CREATED);
    }

    @Operation(summary = "Listar insumos de un producto")
    @GetMapping("/{productoId}/insumos")
    public ResponseEntity<List<ProductoInsumoResponseDTO>> listarInsumos(
            @PathVariable Long productoId) {
        return ResponseEntity.ok(productoInsumoService.listarPorProducto(productoId));
    }

    @Operation(summary = "Eliminar insumo de producto")
    @DeleteMapping("/{productoId}/insumos/{insumoId}")
    public ResponseEntity<Void> eliminarInsumo(
            @PathVariable Long productoId,
            @PathVariable Long insumoId) {
        productoInsumoService.eliminarInsumoDeProducto(productoId, insumoId);
        return ResponseEntity.noContent().build();
    }

    // =====================================================
    // CÁLCULOS
    // =====================================================

    @Operation(summary = "Calcular costo de producto")
    @GetMapping("/{id}/costo")
    public ResponseEntity<Double> calcularCosto(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.calcularCostoProducto(id));
    }

    @Operation(summary = "Calcular costo con desperdicio")
    @GetMapping("/{id}/costo-con-desperdicio")
    public ResponseEntity<Double> calcularCostoConDesperdicio(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.calcularCostoProductoConDesperdicio(id));
    }
    
    @Operation(summary = "Agregar múltiples insumos a un producto (BOM masivo)")
    @PostMapping("/{productoId}/insumos/masivo")
    public ResponseEntity<List<ProductoInsumoResponseDTO>> agregarInsumosMasivo(
            @PathVariable Long productoId,
            @Valid @RequestBody ProductoInsumoListaDTO dto) {
        
        List<ProductoInsumoResponseDTO> creados = productoInsumoService
                .agregarInsumosMasivo(productoId, dto.getInsumos());
        
        return new ResponseEntity<>(creados, HttpStatus.CREATED);
    }
}