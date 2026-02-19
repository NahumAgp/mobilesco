import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  obtenerProveedorPorId,
  crearProveedor,
  actualizarProveedor
} from "../../services/proveedores.js";
import Toast from "../ui/Toast.jsx";

export default function ProveedorForm({ proveedorId }) {

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");

  const navigate = useNavigate();
  const esEdicion = Boolean(proveedorId);

  // =========================
  // ESTADO DEL FORMULARIO
  // =========================
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

  // =========================
  // CARGAR PROVEEDOR SI ES EDICIÓN
  // =========================
  useEffect(() => {
    const cargar = async () => {
      if (!proveedorId) return;

      try {
        const data = await obtenerProveedorPorId(proveedorId);

        setFormData({
          razonSocial: data.razonSocial ?? "",
          rfc: data.rfc ?? "",
          nombre: data.nombre ?? "",
          direccion: data.direccion ?? "",
          correo: data.correo ?? "",
          telefono: data.telefono ?? "",
          activo: data.activo ?? true,
        });

      } catch (e) {
        console.error("Error cargando proveedor:", e);
      }
    };

    cargar();
  }, [proveedorId]);

  // =========================
  // MANEJAR CAMBIOS
  // =========================
  function handleChange(e) {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  }

  // =========================
  // GUARDAR
  // =========================
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setErroresBackend({});

      if (esEdicion) {
        await actualizarProveedor(proveedorId, formData);
        setToastType("success");
        setToastMessage("Proveedor actualizado correctamente");
      } else {
        await crearProveedor(formData);
        setToastType("success");
        setToastMessage("Proveedor creado correctamente");
      }

      // Espera 1 segundo antes de redirigir
      setTimeout(() => {
        navigate("/proveedores");
}, 1000);


    } catch (error) {

  // Si es un objeto con errores por campo
  if (typeof error === "object" && !Array.isArray(error)) {
    setErroresBackend(error);
    return;
  }

  setToastType("danger");
  setToastMessage("Ocurrió un error inesperado");

  console.error(error);
}


  }

  // =========================
  // RENDER
  // =========================
  return (
    <>
      <Toast
        message={toastMessage}
        type={toastType}
        onClose={() => setToastMessage("")}
      />

        <form onSubmit={handleSubmit} noValidate>

          {/* RAZÓN SOCIAL */}
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

          {/* RFC */}
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

          {/* NOMBRE */}
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

          {/* DIRECCIÓN */}
          <div className="mb-3">
            <label className="form-label">Dirección</label>
            <input
              type="text"
              name="direccion"
              className="form-control"
              value={formData.direccion}
              onChange={handleChange}
            />
          </div>

          {/* CORREO */}
          <div className="mb-3">
            <label className="form-label">Correo</label>
            <input
              type="email"
              name="correo"
              className={`form-control ${erroresBackend.correo ? "is-invalid" : ""}`}
              value={formData.correo}
              onChange={handleChange}
            />
            <div className="invalid-feedback">
              {erroresBackend.correo}
            </div>
          </div>

       {/* TELÉFONO */}
<div className="mb-3">
  <label className="form-label">Teléfono</label>

  <input
    type="text"
    name="telefono"
    className={`form-control ${
      erroresBackend.telefono ? "is-invalid" : ""
    }`}
    value={formData.telefono}
    onChange={handleChange}
  />

  {erroresBackend.telefono && (
    <div className="invalid-feedback">
      {erroresBackend.telefono}
    </div>
  )}
</div>



          {/* ACTIVO */}
          <div className="form-check mb-4">
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

          {/* BOTONES */}
          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/proveedores")}
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
    </>

  );
}
