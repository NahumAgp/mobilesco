package com.mobilesco.mobilesco_back.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(
    name = "producto_operacion",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_producto_operacion", columnNames = {"producto_id", "operacion_id", "orden"})
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductoOperacionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "producto_id", nullable = false, 
                foreignKey = @ForeignKey(name = "fk_prodop_producto"))
    private ProductoModel producto;

    @ManyToOne
    @JoinColumn(name = "operacion_id", nullable = false,
                foreignKey = @ForeignKey(name = "fk_prodop_operacion"))
    private OperacionModel operacion;

    @Column(name = "cantidad", nullable = false)
    @Builder.Default
    private Integer cantidad = 1;        // 🔴 NUEVO: Cuántas veces se hace esta operación

    @Column(name = "tiempo_minutos", nullable = false)
    private Double tiempoMinutos;         // Tiempo por CADA vez (minutos por unidad)

    @Column(name = "orden", nullable = false)
    private Integer orden;                 // 1: primero, 2: segundo, etc.

    @Column(name = "observaciones", length = 255)
    private String observaciones;

    @Column(name = "activo")
    @Builder.Default
    private Boolean activo = true;

    @Column(name = "fecha_registro", nullable = false, updatable = false)
    private LocalDateTime fechaRegistro;

    @Column(name = "fecha_actualizacion", nullable = false)
    private LocalDateTime fechaActualizacion;

    @PrePersist
    protected void prePersist() {
        LocalDateTime now = LocalDateTime.now();
        fechaRegistro = now;
        fechaActualizacion = now;
    }

    @PreUpdate
    protected void preUpdate() {
        fechaActualizacion = LocalDateTime.now();
    }

    // 🔴 Métodos calculados
    public Double getTiempoTotalMinutos() {
        return this.cantidad * this.tiempoMinutos;
    }

    public Double getCostoTotalOperacion() {
        return this.getTiempoTotalMinutos() * this.operacion.getCostoMinuto();
    }
}