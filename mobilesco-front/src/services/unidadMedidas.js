import { API_BASE_URL } from "../config/apiConfig";
import { API_PATHS } from "../config/apiPaths";

// ========================================
// URL BASE DEL BACKEND
// ========================================
const API_URL = `${API_BASE_URL}${API_PATHS.UNIDADES_MEDIDA}`;

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
// OBTENER TODAS LAS UNIDADES DE MEDIDA (GET)
// ========================================
export function obtenerUnidadesMedida() {
    return request(API_URL);
}

// ========================================
// OBTENER UNIDAD POR ID (GET)
// ========================================
export function obtenerUnidadMedidaPorId(id) {
    return request(`${API_URL}/${id}`);
}

// ========================================
// CREAR UNIDAD DE MEDIDA (POST)
// ========================================
export function crearUnidadMedida(data) {
    return request(API_URL, {
        method: "POST",
        body: JSON.stringify(data)
    });
}

// ========================================
// ACTUALIZAR UNIDAD DE MEDIDA (PUT)
// ========================================
export function actualizarUnidadMedida(id, data) {
    return request(`${API_URL}/${id}`, {
        method: "PUT",
        body: JSON.stringify(data)
    });
}

// ========================================
// ELIMINAR UNIDAD DE MEDIDA (DELETE)
// ========================================
export function eliminarUnidadMedida(id) {
    return request(`${API_URL}/${id}`, {
        method: "DELETE"
    });
}