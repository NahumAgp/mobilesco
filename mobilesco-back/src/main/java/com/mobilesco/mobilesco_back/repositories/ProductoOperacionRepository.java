package com.mobilesco.mobilesco_back.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.mobilesco.mobilesco_back.models.ProductoOperacionModel;

@Repository
public interface ProductoOperacionRepository extends JpaRepository<ProductoOperacionModel, Long> {
    
    List<ProductoOperacionModel> findByProductoIdOrderByOrdenAsc(Long productoId);
    
    List<ProductoOperacionModel> findByOperacionId(Long operacionId);
    
    @Query("SELECT po FROM ProductoOperacionModel po WHERE po.producto.id = :productoId AND po.activo = true ORDER BY po.orden ASC")
    List<ProductoOperacionModel> findActivasByProducto(@Param("productoId") Long productoId);
    
    boolean existsByProductoIdAndOperacionId(Long productoId, Long operacionId);
    
    @Query("SELECT SUM(po.cantidad * po.tiempoMinutos) FROM ProductoOperacionModel po WHERE po.producto.id = :productoId")
    Double sumarTiempoTotalByProducto(@Param("productoId") Long productoId);
    
    void deleteByProductoId(Long productoId);
}