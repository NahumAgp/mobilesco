import React from "react";
import { useState } from "react";

// Importamos el hook personalizado donde vive toda la lógica
import { useProveedores } from "./useProveedores";

// Componentes visuales
import ProveedoresTable from "../../components/Proveedores/ProveedoresTable.jsx";
import ProveedorModal from "./ProveedorModal";

// Componente común
import PageHeader from "../../components/Sistema/PageHeader.jsx";

// Esta es la función principal del componente.
// En React, un componente es simplemente una función que retorna JSX.
export default function ProveedoresPage() {

  // Aquí estamos usando nuestro hook personalizado.
  // Este hook nos devuelve estados y funciones.
  const {
    proveedores,          // Lista de proveedores
    loadingLista,
    loadingGuardado,
    error,                // Mensaje de error si algo falla
    erroresForm,        // Errores específicos del formulario
    mostrarForm,          // Booleano para mostrar el modal
    proveedorEditando,    // Proveedor seleccionado para editar
    abrirNuevo,           // Función para abrir modal en modo "nuevo"
    abrirEditar,          // Función para abrir modal en modo "editar"
    cerrarForm,           // Función para cerrar el modal
    guardarProveedor,     // Función para guardar (crear o actualizar)
    eliminarProveedor     // Función para eliminar proveedor
  } = useProveedores();
  const [busqueda, setBusqueda] = useState("");
  const [filtroEstatus, setFiltroEstatus] = useState("TODOS");
  const [soloActivos, setSoloActivos] = useState(false);
  const proveedoresFiltrados = proveedores.filter((p) => {

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


  // Lo que retornamos aquí es lo que se va a renderizar en pantalla.
  return (
    <>
      {/* Encabezado de la página */}
      <PageHeader
        title="Directorio de Proveedores" // Título grande
        subtitle="Base de datos centralizada de proveedores" // Texto pequeño debajo
        actions={
          // Botón que aparece a la derecha del header
          <button
            className="btn btn-success"
            onClick={abrirNuevo} // Cuando se hace clic, ejecuta abrirNuevo
          >
            Nuevo Proveedor
          </button>
        }
      />

      {/* Si está cargando, mostramos mensaje */}
     {loadingLista && (
        <div className="alert alert-info">
          Cargando proveedores...
        </div>
      )}


        {/* Si hay error, mostramos mensaje */}
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

      {/* Tabla de proveedores */}
      <ProveedoresTable
        data={proveedoresFiltrados} // Le pasamos la lista filtrada
        onEditar={abrirEditar}    // Le pasamos función editar
        onEliminar={eliminarProveedor} // Le pasamos función eliminar
      />

      {/* Modal (formulario emergente) */}
      <ProveedorModal
        show={mostrarForm}              // Controla si se muestra o no
        proveedor={proveedorEditando}   // Si estamos editando, enviamos datos
        onClose={cerrarForm}            // Función para cerrar
        onSave={guardarProveedor}       // Función para guardar
        errores={erroresForm}
      />
    </>
  );
}
