import { API_BASE_URL } from "../config/apiConfig";
import { API_PATHS } from "../config/apiPaths";

// ========================================
// URL BASE DEL RECURSO
// ========================================

const API_URL = `${API_BASE_URL}${API_PATHS.PROVEEDORES}`;

// ========================================
// FUNCIÓN GENERAL PARA HACER PETICIONES
// ========================================

async function request(url, options = {}) {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    // 🔥 204 - No Content (ej: DELETE exitoso)
    if (response.status === 204) {
      return null;
    }

    // Intentar leer respuesta
    const text = await response.text();
    let data = null;

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }

    // 🔥 Si no fue exitoso, lanzar error estructurado
    if (!response.ok) {
      throw {
        status: response.status,
        message: data?.message || "Error en la petición",
        errors: data?.errors || null,
      };
    }

    return data;

  } catch (error) {
    // 🔥 Error de red o inesperado
    throw {
      status: error.status || 500,
      message: error.message || "Error de conexión con el servidor",
      errors: error.errors || null,
    };
  }
}

// ========================================
// GET - OBTENER TODOS LOS PROVEEDORES
// ========================================

export function obtenerProveedores() {
  return request(API_URL);
}

// ========================================
// GET - OBTENER PROVEEDOR POR ID
// ========================================

export function obtenerProveedorPorId(id) {
  return request(`${API_URL}/${id}`);
}

// ========================================
// POST - CREAR PROVEEDOR
// ========================================

export function crearProveedor(data) {
  return request(API_URL, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ========================================
// PUT - ACTUALIZAR PROVEEDOR
// ========================================

export function actualizarProveedor(id, data) {
  return request(`${API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// ========================================
// DELETE - ELIMINAR PROVEEDOR
// ========================================

export function eliminarProveedor(id) {
  return request(`${API_URL}/${id}`, {
    method: "DELETE",
  });
}
