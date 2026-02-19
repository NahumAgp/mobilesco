package com.mobilesco.mobilesco_back.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ==========================================
    // 🔴 VALIDACIONES (@Valid)
    // ==========================================
  @ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<ApiErrorResponse> handleValidationErrors(
        MethodArgumentNotValidException ex) {

    Map<String, String> errors = new HashMap<>();

    ex.getBindingResult().getFieldErrors().forEach(error ->
        errors.put(error.getField(), error.getDefaultMessage())
    );

    ApiErrorResponse response = new ApiErrorResponse(
            false,
            "Error de validación",
            errors
    );

    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
}


    // ==========================================
    // 🔴 404 - NOT FOUND
    // ==========================================
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ApiErrorResponse> handleNotFoundException(
            NotFoundException ex) {

        ApiErrorResponse response = new ApiErrorResponse(
                false,
                ex.getMessage(),
                null
        );

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
    }

    // ==========================================
    // 🔴 400 - BAD REQUEST
    // ==========================================
    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<ApiErrorResponse> handleBadRequestException(
            BadRequestException ex) {

        ApiErrorResponse response = new ApiErrorResponse(
                false,
                ex.getMessage(),
                null
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
    }


    // ==========================================
    // 🔴 ERRORES GENERALES
    // ==========================================
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorResponse> handleGeneralException(
            Exception ex) {

        ApiErrorResponse response = new ApiErrorResponse(
                false,
                "Error interno del servidor",
                null
        );

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
