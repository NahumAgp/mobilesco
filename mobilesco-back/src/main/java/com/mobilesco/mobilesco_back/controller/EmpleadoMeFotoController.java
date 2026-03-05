package com.mobilesco.mobilesco_back.controller;

import java.io.IOException;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mobilesco.mobilesco_back.config.ApiPaths;
import com.mobilesco.mobilesco_back.exceptions.BadRequestException;
import com.mobilesco.mobilesco_back.exceptions.NotFoundException;
import com.mobilesco.mobilesco_back.models.EmpleadoModel;
import com.mobilesco.mobilesco_back.models.UsuarioModel;
import com.mobilesco.mobilesco_back.repositories.EmpleadoRepository;
import com.mobilesco.mobilesco_back.repositories.UsuarioRepository;
import com.mobilesco.mobilesco_back.services.AlmacenamientoImagenesService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Empleado - Mi Foto", description = "Subida de tu foto de perfil")
@RestController
@RequestMapping(ApiPaths.EMPLEADOS)
public class EmpleadoMeFotoController {

    private final UsuarioRepository userRepository;
    private final EmpleadoRepository empleadoRepository;
    private final AlmacenamientoImagenesService almacenamientoImagenesService;

    public EmpleadoMeFotoController(
            UsuarioRepository userRepository,
            EmpleadoRepository empleadoRepository,
            AlmacenamientoImagenesService almacenamientoImagenesService
    ) {
        this.userRepository = userRepository;
        this.empleadoRepository = empleadoRepository;
        this.almacenamientoImagenesService = almacenamientoImagenesService;
    }

    @PostMapping("/me/foto")
    @Operation(summary = "Subir/reemplazar mi foto de perfil (usuario logueado)")
    public ResponseEntity<?> subirMiFoto(
            Authentication auth,
            @RequestParam(value = "archivo", required = false) MultipartFile archivo
    ) throws IOException {

        String email = auth.getName();

        UsuarioModel user = userRepository.findByEmail(email)
                .orElseThrow(() -> new NotFoundException("Usuario no encontrado"));

        if (user.getEmpleado() == null) {
            throw new BadRequestException("Tu usuario no está ligado a un empleado todavía.");
        }

        EmpleadoModel empleado = user.getEmpleado();

        String rutaPublica = almacenamientoImagenesService.guardarFotoPerfilEmpleado(empleado.getId(), archivo);

        empleado.setFotoUrl(rutaPublica);
        empleadoRepository.save(empleado);

        return ResponseEntity.ok(Map.of("fotoUrl", rutaPublica));
    }
}