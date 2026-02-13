import { useEffect, useState } from "react";

import {
  obtenerProveedores,
  crearProveedor,
  actualizarProveedor,
  eliminarProveedor
} from "../../services/proveedores.Js";

export function useProveedores() {

  // ================================
  // ESTADOS
  // ================================

  const [proveedores, setProveedores] = useState([]);

  // 🔹 Loading SOLO para cargar lista
  const [loadingLista, setLoadingLista] = useState(false);

  // 🔹 Loading SOLO para guardar
  const [loadingGuardado, setLoadingGuardado] = useState(false);

  const [error, setError] = useState("");

  const [mostrarForm, setMostrarForm] = useState(false);
  const [proveedorEditando, setProveedorEditando] = useState(null);

  // ================================
  // CARGAR LISTA
  // ================================

  async function recargar() {
    try {
      setLoadingLista(true);
      setError("");

      const data = await obtenerProveedores();
      setProveedores(data);

    } catch (e) {
      setError("Error cargando proveedores");
    } finally {
      setLoadingLista(false);
    }
  }

  useEffect(() => {
    recargar();
  }, []);

  // ================================
  // ABRIR NUEVO
  // ================================

  function abrirNuevo() {
    setProveedorEditando(null);
    setMostrarForm(true);
  }

  // ================================
  // ABRIR EDITAR
  // ================================

  function abrirEditar(proveedor) {
    setProveedorEditando(proveedor);
    setMostrarForm(true);
  }

  // ================================
  // CERRAR FORM
  // ================================

  function cerrarForm() {
    setProveedorEditando(null);
    setMostrarForm(false);
  }

  // ================================
  // GUARDAR (POST o PUT)
  // ================================

  async function guardarProveedor(data) {

    try {
      setLoadingGuardado(true);

      if (proveedorEditando) {
        await actualizarProveedor({
        ...data,
        id: proveedorEditando.id
      });

      } else {
        await crearProveedor(data);
      }

      cerrarForm();
      await recargar();

    } catch (e) {
      console.log("Error backend:", e);
      throw e; // 🔥 El form lo captura
    } finally {
      setLoadingGuardado(false);
    }
  }

  // ================================
  // ELIMINAR
  // ================================

  async function eliminar(id) {

    try {
      setLoadingLista(true);
      setError("");

      await eliminarProveedor(id);
      await recargar();

    } catch (e) {
      setError("Error eliminando proveedor");
    } finally {
      setLoadingLista(false);
    }
  }

  // ================================
  // RETURN
  // ================================

  return {
    proveedores,
    loadingLista,
    loadingGuardado,
    error,
    mostrarForm,
    proveedorEditando,
    abrirNuevo,
    abrirEditar,
    cerrarForm,
    guardarProveedor,
    eliminarProveedor: eliminar
  };
}
