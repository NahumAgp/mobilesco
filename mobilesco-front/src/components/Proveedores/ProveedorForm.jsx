import { useEffect, useState } from "react";

// Recibe props:
// proveedor → si estamos editando, viene con datos
// onSave → función que viene del hook
// onCancel → función para cerrar modal
export default function ProveedorForm({ proveedor, onSave, onCancel }) {

  // ============================
  // ESTADO LOCAL DEL FORMULARIO
  // ============================
const [erroresBackend, setErroresBackend] = useState({});

  

  const [formData, setFormData] = useState({
    razonSocial: "",
    rfc: "",
    nombre: "",
    direccion: "",
    correo: "",
    telefono: "",
    activo: true
  });

  // ======================================
  // SI ESTAMOS EDITANDO, CARGAMOS LOS DATOS
  // ======================================

  useEffect(() => {
    if (proveedor) {
      setFormData({
        razonSocial: proveedor.razonSocial || "",
        rfc: proveedor.rfc || "",
        nombre: proveedor.nombre || "",
        direccion: proveedor.direccion || "",
        correo: proveedor.correo || "",
        telefono: proveedor.telefono || "",
        activo: proveedor.activo ?? true
      });
    }
  }, [proveedor]);
  // Este efecto se ejecuta cuando cambia proveedor



  // ============================
  // MANEJAR CAMBIOS EN INPUTS
  // ============================

  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  }



  // ============================
  // ENVIAR FORMULARIO
  // ============================

  async function handleSubmit(e) {
  e.preventDefault();

  try {
    await onSave(formData);
    setErroresBackend([]); // limpia si todo sale bien
  } catch (e) {

  if (e?.errors) {

    const erroresPorCampo = {};

    e.errors.forEach((msg) => {
      const m = msg.toLowerCase();

      if (m.includes("teléfono") || m.includes("telefono"))
        erroresPorCampo.telefono = msg;

      if (m.includes("nombre del contacto"))
        erroresPorCampo.nombre = msg;

      if (m.includes("correo"))
        erroresPorCampo.correo = msg;

      if (m.includes("razón social"))
        erroresPorCampo.razonSocial = msg;
    });

    setErroresBackend(erroresPorCampo);

  }
}

}




  return (
    <form onSubmit={handleSubmit} noValidate>

      {/* ================== RAZÓN SOCIAL ================== */}
      <div className="mb-3">
        <label className="form-label">Razón Social</label>
          <input
            type="text"
            name="razonSocial"
            className={`form-control ${erroresBackend.razonSocial ? "is-invalid" : ""}`}
            value={formData.razonSocial}
            onChange={handleChange}
          />

          <div className="invalid-feedback">
            {erroresBackend.razonSocial}
          </div>
      </div>


      {/* ================== RFC ================== */}
      <div className="mb-3">
        <label className="form-label">RFC</label>
         <input
          type="text"
          name="rfc"
          className={`form-control ${erroresBackend.rfc ? "is-invalid" : ""}`}
          value={formData.rfc}
          onChange={handleChange}
        />
          <div className="invalid-feedback">
            {erroresBackend.rfc}
          </div>
      </div>


       {/* ================== NOMBRE ================== */}
      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          name="nombre"
          className={`form-control ${erroresBackend.nombre ? "is-invalid" : ""}`}
          value={formData.nombre}
          onChange={handleChange}
        />
          <div className="invalid-feedback">
            {erroresBackend.nombre}
          </div>
      </div>

      {/* ================== DIRECCIÓN ================== */}
      <div className="mb-3">
        <label className="form-label">Dirección</label>
        <input
          type="text"
          name="direccion"
          className={`form-control ${erroresBackend.direccion ? "is-invalid" : ""}`}
          value={formData.direccion}
          onChange={handleChange}
        />
          <div className="invalid-feedback">
            {erroresBackend.direccion}
          </div>
      </div>

      {/* ================== CORREO ================== */}
      <div className="mb-3">
        <label className="form-label">Correo</label>
        <input
          type="text"
          name="correo"
          className={`form-control ${erroresBackend.correo ? "is-invalid" : ""}`}
          value={formData.correo}
          onChange={handleChange}
        />
          <div className="invalid-feedback">
            {erroresBackend.correo}
          </div>
      </div>

      {/* ================== TELÉFONO ================== */}
      <div className="mb-3">
        <label className="form-label">Teléfono</label>
       <input
          type="text"
          name="telefono"
          className={`form-control ${erroresBackend.telefono ? "is-invalid" : ""}`}
          value={formData.telefono}
          onChange={handleChange}
        />
          <div className="invalid-feedback">
            {erroresBackend.telefono}
          </div>
      </div>

      {/* ================== ACTIVO ================== */}
      <div className="form-check mb-3">
        <input
          type="checkbox"
          className="form-check-input"
          name="activo"
          checked={formData.activo}
          onChange={handleChange}
        />
        <label className="form-check-label">
          Activo
        </label>
      </div>

      {/* ================== BOTONES ================== */}
      <div className="d-flex justify-content-end gap-2">

        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="btn btn-primary"
        >
          Guardar
        </button>

      </div>

    </form>
  );
}
