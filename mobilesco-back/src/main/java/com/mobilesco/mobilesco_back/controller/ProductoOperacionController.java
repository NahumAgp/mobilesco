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
import org.springframework.web.bind.annotation.RestController;

import com.mobilesco.mobilesco_back.dto.ProductoOperacion.ProductoOperacionCreateDTO;
import com.mobilesco.mobilesco_back.dto.ProductoOperacion.ProductoOperacionResponseDTO;
import com.mobilesco.mobilesco_back.services.ProductoOperacionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@Tag(name = "Producto-Operación", description = "BOM de operaciones (qué operaciones lleva cada producto)")
@RestController
@RequestMapping("/api/producto-operaciones")
@RequiredArgsConstructor
public class ProductoOperacionController {

    private final ProductoOperacionService productoOperacionService;

    @Operation(summary = "Agregar operación a producto (individual)")
    @PostMapping("/producto/{productoId}")
    public ResponseEntity<ProductoOperacionResponseDTO> agregarOperacion(
            @PathVariable Long productoId,
            @Valid @RequestBody ProductoOperacionCreateDTO dto) {
        return new ResponseEntity<>(
                productoOperacionService.agregarOperacionAProducto(productoId, dto),
                HttpStatus.CREATED);
    }

    @Operation(summary = "Agregar múltiples operaciones a producto (masivo)")
    @PostMapping("/producto/{productoId}/masivo")
    public ResponseEntity<List<ProductoOperacionResponseDTO>> agregarOperacionesMasivo(
            @PathVariable Long productoId,
            @Valid @RequestBody List<ProductoOperacionCreateDTO> dtoList) {
        return new ResponseEntity<>(
                productoOperacionService.agregarOperacionesMasivo(productoId, dtoList),
                HttpStatus.CREATED);
    }

    @Operation(summary = "Listar operaciones de un producto")
    @GetMapping("/producto/{productoId}")
    public ResponseEntity<List<ProductoOperacionResponseDTO>> listarPorProducto(
            @PathVariable Long productoId) {
        return ResponseEntity.ok(productoOperacionService.listarPorProducto(productoId));
    }

    @Operation(summary = "Eliminar operación de producto")
    @DeleteMapping("/producto/{productoId}/operacion/{operacionId}")
    public ResponseEntity<Void> eliminarOperacion(
            @PathVariable Long productoId,
            @PathVariable Long operacionId) {
        productoOperacionService.eliminarOperacionDeProducto(productoId, operacionId);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "Reordenar operaciones de un producto")
    @PutMapping("/producto/{productoId}/reordenar")
    public ResponseEntity<Void> reordenarOperaciones(
            @PathVariable Long productoId,
            @RequestBody List<Long> operacionesIdsEnOrden) {
        productoOperacionService.reordenarOperaciones(productoId, operacionesIdsEnOrden);
        return ResponseEntity.ok().build();
    }
}