package com.mobilesco.mobilesco_back.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // 🔹 ERRORES DE VALIDACIÓN (@Valid)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationErrors(
            MethodArgumentNotValidException ex) {

        Map<String, String> errores = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error ->
            errores.put(error.getField(), error.getDefaultMessage())
        );

        return ResponseEntity.badRequest().body(errores);
    }

    // 🔹 ERROR DE CAMPO DUPLICADO
    @ExceptionHandler(DuplicateFieldException.class)
    public ResponseEntity<Map<String, String>> handleDuplicateField(
            DuplicateFieldException ex) {

        Map<String, String> error = new HashMap<>();
        error.put(ex.getField(), ex.getMessage());

        return ResponseEntity.badRequest().body(error);
    }

    // 🔹 ERROR GENERAL (solo si algo explota)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, String>> handleGeneral(Exception ex) {

        Map<String, String> error = new HashMap<>();
        error.put("error", "Ocurrió un error inesperado");

        return ResponseEntity.internalServerError().body(error);
    }
}
