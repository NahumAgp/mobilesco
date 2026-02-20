import { API_BASE_URL } from "../config/apiConfig";
import { API_PATHS } from "../config/apiPaths";
// ========================================
// URL BASE DEL BACKEND
// ========================================

const API_URL = `${API_BASE_URL}${API_PATHS.PROVEEDORES}`;


// ========================================
// FUNCIÓN GENERAL PARA HACER PETICIONES
// ========================================

async function request(url, options = {}) {

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options.headers
    },
    ...options
  });

  // 🔥 Si es 204 No Content, fue exitoso
  if (response.status === 204) {
    return null;
  }

  // 🔥 Si no hay contenido, no intentes parsear
  const text = await response.text();

  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    throw data || { message: "Error en la petición" };
  }

  return data;
}




// ========================================
// OBTENER TODOS LOS PROVEEDORES (GET)
// ========================================

export function obtenerProveedores() {
  return request(API_URL);
}



// ========================================
// OBTENER PROVEEDOR POR ID (GET)
// ========================================

export function obtenerProveedorPorId(id) {
  return request(`${API_URL}/${id}`);
}



// ========================================
// CREAR PROVEEDOR (POST)
// ========================================

export function crearProveedor(data) {
  return request(API_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });
}



// ========================================
// ACTUALIZAR PROVEEDOR (PUT)
// ========================================
// 🔥 IMPORTANTE: ahora recibe (id, data)
// para que funcione con el nuevo formulario

export function actualizarProveedor(id, data) {
  return request(`${API_URL}/${id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
}



// ========================================
// ELIMINAR PROVEEDOR (DELETE)
// ========================================

export function eliminarProveedor(id) {
  return request(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}
