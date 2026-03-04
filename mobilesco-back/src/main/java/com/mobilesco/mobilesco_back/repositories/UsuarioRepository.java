package com.mobilesco.mobilesco_back.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mobilesco.mobilesco_back.models.UsuarioModel;

public interface  UsuarioRepository extends  JpaRepository<UsuarioModel, Long> {

    // Spring entiende el nombre y genera el SQL automáticamente:
    Optional<UsuarioModel> findByEmail(String email);

    // Útil para validaciones (ej. registro):
    boolean existsByEmail(String email);
    
}
