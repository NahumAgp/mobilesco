package com.mobilesco.mobilesco_back.dto.proveedor;

import java.time.LocalDate;

public class ProveedorResponseDTO {
    
    private Long id;
    private String razonSocial;
    private String rfc;
    private String nombre;
    private String direccion;
    private String telefono;
    private String correo;
    private LocalDate fechaRegistro;
    private LocalDate fechaUltimoContacto;
    private Boolean activo;
    
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

    // Getters y Setters
    
}
