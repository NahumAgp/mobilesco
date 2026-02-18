import { useParams, useNavigate } from "react-router-dom";
import ProveedoresForm from "../../components/Proveedores/ProveedorForm.jsx";

export default function ProveedorFormPage() {
  const { id } = useParams(); // si existe, estamos editando
  const navigate = useNavigate();
  const esEdicion = Boolean(id);

  return (
    <div className="container mt-4">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3 className="m-0">{esEdicion ? "Editar Proveedor" : "Nuevo Proveedor"}</h3>

        <button className="btn btn-outline-secondary" onClick={() => navigate("/proveedores")}>
          Volver
        </button>
      </div>

      {/* FORMULARIO */}
      <div className="card mb-4">
        <div className="card-body">
          {/* Reutilizamos el MISMO form */}
          <ProveedoresForm proveedorId={id} />
        </div>
      </div>

      {/* COMPRAS (solo dejamos el espacio por ahora) */}
      {esEdicion && (
        <div className="card">
          <div className="card-body">
            <h5 className="mb-2">Compras realizadas a este proveedor</h5>
            <div className="text-muted">
              (Pendiente) Aquí irá la tabla de compras de este proveedor.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
