package com.mobilesco.mobilesco_back.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.mobilesco.mobilesco_back.models.InsumoModel;

@Repository
public interface InsumoRepository extends JpaRepository<InsumoModel, Long> {

    Optional<InsumoModel> findByNombreIgnoreCase(String nombre);

    List<InsumoModel> findByActivoTrue();
}
