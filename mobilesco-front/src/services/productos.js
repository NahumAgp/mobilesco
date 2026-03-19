import request from "./api";
import { API_PATHS } from "../config/apiPaths";

// ========================================
// PRODUCTOS
// ========================================

export function obtenerProductos() {
  console.log("🌐 GET Productos - URL:", API_PATHS.PRODUCTOS);
  return request(API_PATHS.PRODUCTOS);
}

export function obtenerProductoPorId(id) {
  const url = `${API_PATHS.PRODUCTOS}/${id}`;
  console.log("🌐 GET Producto by ID - URL:", url);
  return request(url);
}

export function obtenerProductoPorSku(sku) {
  const url = `${API_PATHS.PRODUCTOS}/sku/${sku}`;
  console.log("🌐 GET Producto by SKU - URL:", url);
  return request(url);
}

export function crearProducto(data) {
  console.log("🌐 POST Producto - URL:", API_PATHS.PRODUCTOS, "Data:", data);
  return request(API_PATHS.PRODUCTOS, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function actualizarProducto(id, data) {
  const url = `${API_PATHS.PRODUCTOS}/${id}`;
  console.log("🌐 PUT Producto - URL:", url, "Data:", data);
  return request(url, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export function eliminarProducto(id) {
  const url = `${API_PATHS.PRODUCTOS}/${id}`;
  console.log("🌐 DELETE Producto - URL:", url);
  return request(url, {
    method: "DELETE",
  });
}

export function obtenerProductosActivos() {
  const url = `${API_PATHS.PRODUCTOS}/activos`;
  console.log("🌐 GET Productos Activos - URL:", url);
  return request(url);
}

export function buscarProductos(nombre) {
  const url = `${API_PATHS.PRODUCTOS}/buscar?nombre=${encodeURIComponent(nombre)}`;
  console.log("🌐 GET Buscar Productos - URL:", url);
  return request(url);
}

// ========================================
// BOM (LISTA DE MATERIALES)
// ========================================

export function obtenerInsumosDeProducto(productoId) {
  const url = `${API_PATHS.PRODUCTOS}/${productoId}/insumos`;
  console.log("🌐 GET Insumos de Producto - URL:", url);
  return request(url);
}

export function agregarInsumoAProducto(productoId, data) {
  const url = `${API_PATHS.PRODUCTOS}/${productoId}/insumos`;
  console.log("🌐 POST Agregar Insumo - URL:", url, "Data:", data);
  return request(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export function agregarInsumosMasivo(productoId, insumos) {
  const url = `${API_PATHS.PRODUCTOS}/${productoId}/insumos/masivo`;
  console.log("🌐 POST Agregar Insumos Masivo - URL:", url, "Data:", insumos);
  return request(url, {
    method: "POST",
    body: JSON.stringify({ insumos }),
  });
}

export function eliminarInsumoDeProducto(productoId, insumoId) {
  const url = `${API_PATHS.PRODUCTOS}/${productoId}/insumos/${insumoId}`;
  console.log("🌐 DELETE Insumo de Producto - URL:", url);
  return request(url, {
    method: "DELETE",
  });
}

// ========================================
// CÁLCULOS
// ========================================

export function calcularCostoProducto(id) {
  const url = `${API_PATHS.PRODUCTOS}/${id}/costo`;
  console.log("🌐 GET Calcular Costo - URL:", url);
  return request(url);
}

export function calcularCostoConDesperdicio(id) {
  const url = `${API_PATHS.PRODUCTOS}/${id}/costo-con-desperdicio`;
  console.log("🌐 GET Calcular Costo con Desperdicio - URL:", url);
  return request(url);
}