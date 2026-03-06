import React from "react";

export default function EmpleadosTable({ data, onEditar, onEliminar }) {

  return (

    <div className="table-responsive">

      <table className="table table-striped table-hover">

        <thead>

          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>

        </thead>

        <tbody>

          {data.length === 0 ? (

            <tr>
              <td colSpan="5" className="text-center">
                No hay empleados registrados
              </td>
            </tr>

          ) : (

            data.map((e) => (

              <tr key={e.id}>

                <td>{e.id}</td>

                <td>
                  {e.nombre} {e.apellidoPaterno} {e.apellidoMaterno}
                </td>

                <td>{e.telefono}</td>

                <td>

                  <span
                    className={
                      e.activo
                        ? "badge bg-success-subtle text-success border border-success-subtle"
                        : "badge bg-secondary-subtle text-secondary border border-secondary-subtle"
                    }
                  >
                    {e.activo ? "Activo" : "Inactivo"}
                  </span>

                </td>

                <td>

                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => onEditar(e)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onEliminar(e.id)}
                  >
                    Eliminar
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>

  );

}