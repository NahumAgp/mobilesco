// ========================================
// URL BASE DEL BACKEND
// ========================================

// Aquí definimos la ruta base de tu API.
// Cambia el puerto si tu backend usa otro.
const API_URL = "http://localhost:8081/proveedor";


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
    throw data; // 🔥 Lanzamos el objeto REAL, no new Error()
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

export async function actualizarProveedor(data) {
  return request(`${API_URL}/${data.id}`, {
    method: "PUT",
    body: JSON.stringify(data)
  });
}






// ========================================
// ELIMINAR PROVEEDOR (DELETE)
// ========================================

export function eliminarProveedor(id) {
  console.log("Enviando al backend:", id); 
  return request(`${API_URL}/${id}`, {
    method: "DELETE"
  });
}
