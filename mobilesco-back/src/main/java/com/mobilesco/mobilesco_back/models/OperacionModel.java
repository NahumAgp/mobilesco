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
    name = "operacion",
    uniqueConstraints = {
        @UniqueConstraint(name = "uk_operacion_codigo", columnNames = {"codigo"})
    }
)
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OperacionModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "codigo", nullable = false, length = 20)
    private String codigo;           // "CORTE-01", "SOLD-01", "INYEC-01"

    @Column(name = "nombre", nullable = false, length = 100)
    private String nombre;            // "Corte de tubo", "Soldadura", "Inyección"

    @Column(name = "descripcion", length = 255)
    private String descripcion;

    @ManyToOne
    @JoinColumn(name = "centro_trabajo_id", foreignKey = @ForeignKey(name = "fk_operacion_centro"))
    private CentroTrabajoModel centroTrabajo;  // Relación con Centro de Trabajo (lo crearemos después)

    @Column(name = "costo_minuto", nullable = false)
    private Double costoMinuto;        // $5.50 por minuto (incluye sueldo + prestaciones)

    @Column(name = "costo_hora")
    private Double costoHora;          // $330 por hora (cálculo automático)

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
        
        // Calcular costo por hora automáticamente
        if (costoMinuto != null) {
            this.costoHora = costoMinuto * 60;
        }
    }

    @PreUpdate
    protected void preUpdate() {
        fechaActualizacion = LocalDateTime.now();
        
        // Recalcular costo por hora si cambió el costo por minuto
        if (costoMinuto != null) {
            this.costoHora = costoMinuto * 60;
        }
    }
}