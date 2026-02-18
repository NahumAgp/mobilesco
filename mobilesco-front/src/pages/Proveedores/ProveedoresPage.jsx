import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProveedores } from "./useProveedores";

import ProveedoresTable from "../../components/Proveedores/ProveedoresTable.jsx";
import PageHeader from "../../components/Sistema/PageHeader.jsx";
import Toast from "../../components/ui/Toast.jsx";

export default function ProveedoresPage() {

  const navigate = useNavigate();

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const {
    proveedores,
    loadingLista,
    error,
    eliminarProveedor
  } = useProveedores();

  const [busqueda, setBusqueda] = useState("");
  const [filtroEstatus, setFiltroEstatus] = useState("TODOS");
  const [soloActivos, setSoloActivos] = useState(false);

  const abrirEditar = (proveedor) => {
    navigate(`/proveedores/${proveedor.id}`);
  };

  const manejarEliminar = async (id) => {

    const confirmacion = window.confirm("¿Seguro que deseas eliminar este proveedor?");
    if (!confirmacion) return;

    try {

      await eliminarProveedor(id);

      setToastType("success");
      setToastMessage("Proveedor eliminado correctamente");

    } catch (e) {

      setToastType("danger");
      setToastMessage("Error al eliminar proveedor");
    }
  };

  const proveedoresFiltrados = proveedores.filter((p) => {
    // console.log(proveedores) 
    const coincideBusqueda =
      p.razonSocial.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.nombre?.toLowerCase().includes(busqueda.toLowerCase()) ||
      p.correo?.toLowerCase().includes(busqueda.toLowerCase());

    const coincideEstatus =
      filtroEstatus === "TODOS" ||
      (filtroEstatus === "ACTIVO" && p.activo) ||
      (filtroEstatus === "INACTIVO" && !p.activo);

    const coincideSoloActivos =
      !soloActivos || p.activo;

    return coincideBusqueda && coincideEstatus && coincideSoloActivos;
  });

  return (
    <>
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage("")}
      />

      <PageHeader
        title="Directorio de Proveedores"
        subtitle="Base de datos centralizada de proveedores"
        actions={
          <button
            className="btn btn-success"
            onClick={() => navigate("/proveedores/nuevo")}
          >
            Nuevo Proveedor
          </button>
        }
      />

      {loadingLista && (
        <div className="alert alert-info">
          Cargando proveedores...
        </div>
      )}

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      <div className="card mb-3">
        <div className="card-body">
          <div className="row g-2 align-items-center">

            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por razón social, contacto, correo..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            <div className="col-md-2">
              <select
                className="form-select"
                value={filtroEstatus}
                onChange={(e) => setFiltroEstatus(e.target.value)}
              >
                <option value="TODOS">Todos</option>
                <option value="ACTIVO">Activos</option>
                <option value="INACTIVO">Inactivos</option>
              </select>
            </div>

            <div className="col-md-2 d-flex align-items-center">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={soloActivos}
                  onChange={() => setSoloActivos(!soloActivos)}
                />
                <label className="form-check-label">
                  Solo activos
                </label>
              </div>
            </div>

          </div>
        </div>
      </div>

      <ProveedoresTable
        data={proveedoresFiltrados}
        onEditar={abrirEditar}
        onEliminar={manejarEliminar}
      />
    </>
  );
}
