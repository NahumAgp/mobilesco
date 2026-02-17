// ========================================
// URL BASE DEL BACKEND (dinámica por entorno)
// ========================================

const API_URL = `http://localhost:8081/proveedor`;


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

  const text = await response.text();

  let data = null;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    throw data;
  }

  return data;
}


// ========================================
// OBTENER TODOS LOS PROVEEDORES
// ========================================

export function obtenerProveedores() {
  return request(API_URL);
}


// ========================================
// CREAR PROVEEDOR
// ========================================

export function crearProveedor(data) {
  return request(API_URL, {
    method: "POST",
    body: JSON.stringify(data)
  });
}


// ========================================
// ACTUALIZAR PROVEEDOR
// ========================================

export function actualizarProveedor(data) {
  return request(`${API_URL}/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
}


// ========================================
// ELIMINAR PROVEEDOR
// ========================================

export function eliminarProveedor(id) {
  return request(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}
