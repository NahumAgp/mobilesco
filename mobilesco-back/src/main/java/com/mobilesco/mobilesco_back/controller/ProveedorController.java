package com.mobilesco.mobilesco_back.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mobilesco.mobilesco_back.dto.proveedor.ProveedorCreateDTO;
import com.mobilesco.mobilesco_back.dto.proveedor.ProveedorResponseDTO;
import com.mobilesco.mobilesco_back.dto.proveedor.ProveedorUpdateDTO;
import com.mobilesco.mobilesco_back.services.ProveedorService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@Tag(name = "Proveedor", description = "CRUD y gestión de proveedores")
@RestController
@RequestMapping("/proveedor")
public class ProveedorController {

    @Autowired
    private ProveedorService proveedorService;

    // GET /proveedor?activo=true&nombre=...&contacto=...
    @GetMapping
    @Operation(
        summary = "Listar proveedores",
        description = "Devuelve proveedores. Puedes filtrar por activo, nombre o contacto."
    )
    public List<ProveedorResponseDTO> listar(
        
        @Parameter(description = "Filtra por estado (true=activos, false=inactivos)", example = "true")
        @RequestParam(required = false) Boolean activo,

        @Parameter(description = "Busca por nombre (contiene, ignora mayúsculas)", example = "prove")
        @RequestParam(required = false) String nombre
    ) {
        boolean tieneNombre = (nombre != null && !nombre.isBlank());

        if (activo != null && tieneNombre) {
            return proveedorService.buscarPorActivoYNombre(activo, nombre);
        }
        if (activo != null) {
            return proveedorService.buscarPorActivo(activo);
        }
        if (tieneNombre) {
            return proveedorService.buscarPorNombre(nombre);
        }
       

        return proveedorService.obtenerTodos();
    }

    // GET /proveedor/{id}
    @Operation(summary = "Obtener proveedor por ID", description = "Devuelve un proveedor si existe.")
    @GetMapping("/{id}")
    public ResponseEntity<ProveedorResponseDTO> obtenerPorId(@PathVariable Long id) {
        return proveedorService.obtenerPorId(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // POST /proveedor
    @Operation(summary = "Crear proveedor", description = "Crea un proveedor. Por defecto se crea como activo.")
    @PostMapping
    public ProveedorResponseDTO crear(@Valid @RequestBody ProveedorCreateDTO dto) {
        return proveedorService.crear(dto);
    }

    // PUT /proveedor/{id}
    @Operation(summary = "Actualizar proveedor", description = "Actualiza los datos del proveedor por ID.")
    @PutMapping("/{id}")
    public ResponseEntity<ProveedorResponseDTO> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody ProveedorUpdateDTO dto
    ) {
        return proveedorService.actualizar(id, dto)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE /proveedor/{id}
    @Operation(summary = "Eliminar proveedor", description = "Elimina físicamente el proveedor de la base de datos.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        boolean ok = proveedorService.eliminar(id);
        return ok ? ResponseEntity.noContent().build()
                  : ResponseEntity.notFound().build();
    }


    @Operation(summary = "Desactivar proveedor", description = "Soft delete: marca activo=false sin borrar de la BD.")
    @PatchMapping("/{id}/desactivar")
    public ResponseEntity<Void> desactivar(@PathVariable Long id) {
        boolean ok = proveedorService.desactivar(id);
        return ok ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

    @Operation(summary = "Activar proveedor", description = "Reactiva un proveedor marcando activo=true.")
    @PatchMapping("/{id}/activar")
    public ResponseEntity<Void> activar(@PathVariable Long id) {
        boolean ok = proveedorService.activar(id);
        return ok ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }

}
