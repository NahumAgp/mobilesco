package com.mobilesco.mobilesco_back.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mobilesco.mobilesco_back.models.FamiliaModel;

public interface FamiliaRepository extends JpaRepository<FamiliaModel, Long> {

    boolean existsByNombreIgnoreCaseAndPadre_Id(String nombre, Long padreId);

    boolean existsByNombreIgnoreCaseAndPadreIsNull(String nombre);

    List<FamiliaModel> findByActivoTrueOrderByNombreAsc();
}