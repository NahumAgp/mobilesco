package com.mobilesco.mobilesco_back.dto.proveedor;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public class ProveedorCreateDTO {

    @NotBlank(message = "La razón social es obligatoria")
    private String razonSocial;

    private String rfc;

    @NotBlank(message = "El nombre del contacto es obligatorio")
    private String nombre;

    private String direccion;

    @NotBlank(message = "El teléfono es obligatorio")
    @Pattern(
        regexp = "^[0-9]{10}$",
        message = "El teléfono debe contener exactamente 10 dígitos numéricos"
    )
    private String telefono;

    @Email(message = "El correo debe ser válido")
    private String correo;

    // Getters y Setters
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

    // Getters y Setters
    
}
