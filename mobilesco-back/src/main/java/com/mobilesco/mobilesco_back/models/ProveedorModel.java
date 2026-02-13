package com.mobilesco.mobilesco_back.models;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;

@Entity
@Table(name = "proveedor")
public class ProveedorModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String razonSocial;
    private String rfc;
    private String nombre;
    private String direccion;
    private String telefono;
    private String correo;

    

    @Column(name = "fecha_ultimo_contacto")
    private LocalDate fechaUltimoContacto;

     @Column(name = "activo")
    private Boolean activo;

    @Column(name = "fecha_registro")
    private LocalDate fechaRegistro;
    
    @PrePersist
    protected void onCreate() {
        this.fechaRegistro = LocalDate.now();
    }
    

     public Long getId() {
         return id;
     }

     public void setId(Long id) {
         this.id = id;
     }

     public String getRazonSocial() {
         return razonSocial;
     }

     public void setRazonSocial(String razonSocial) {
         this.razonSocial = razonSocial;
     }

     public String getRfc() {
         return rfc;
     }

     public void setRfc(String rfc) {
         this.rfc = rfc;
     }

     public String getNombre() {
         return nombre;
     }

     public void setNombre(String nombre) {
         this.nombre = nombre;
     }

     public String getDireccion() {
         return direccion;
     }

     public void setDireccion(String direccion) {
         this.direccion = direccion;
     }

     public String getTelefono() {
         return telefono;
     }

     public void setTelefono(String telefono) {
         this.telefono = telefono;
     }

     public String getCorreo() {
         return correo;
     }

     public void setCorreo(String correo) {
         this.correo = correo;
     }

     public LocalDate getFechaRegistro() {
         return fechaRegistro;
     }

     public void setFechaRegistro(LocalDate fechaRegistro) {
         this.fechaRegistro = fechaRegistro;
     }

     public LocalDate getFechaUltimoContacto() {
         return fechaUltimoContacto;
     }

     public void setFechaUltimoContacto(LocalDate fechaUltimoContacto) {
         this.fechaUltimoContacto = fechaUltimoContacto;
     }

     public Boolean getActivo() {
         return activo;
     }

     public void setActivo(Boolean activo) {
         this.activo = activo;
     }

    //Getters & Setters
    
    
}
