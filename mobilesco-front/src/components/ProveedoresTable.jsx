// Recibimos props desde la página:
// data → lista de proveedores
// onEditar → función para editar
// onEliminar → función para eliminar
export default function ProveedoresTable({ data, onEditar, onEliminar }) {

  return (
    <div className="card">
        
      
      {/* Hace que la tabla tenga scroll horizontal si es necesario */}
      <div className="table-responsive">

        <table className="table table-hover mb-0">

          {/* ================== CABECERA ================== */}
          <thead className="table-light">
            <tr>
              <th>Id</th>
              <th>Razón Social</th>
              <th>Contacto</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th>Estado</th>
              <th>Fecha de Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>

          {/* ================== CUERPO ================== */}
          <tbody>

            {/* Si hay proveedores, los recorremos */}
            {data && data.length > 0 ? (

              data.map((proveedor) => (
                <tr key={proveedor.id}>

                  {/* Mostramos cada campo */}
                  <td>{proveedor.id}</td>
                  <td>{proveedor.razonSocial}</td>
                  <td>{proveedor.nombre}</td>
                  <td>{proveedor.correo}</td>
                  <td>{proveedor.telefono}</td>

                  {/* Convertimos booleano en texto */}
                  <td>
                    {proveedor.activo ? "Activo" : "Inactivo"}
                  </td>

                  {/* Formateamos fecha si existe */}
                  <td>
                    {proveedor.fechaRegistro
                      ? new Date(proveedor.fechaRegistro).toLocaleDateString()
                      : "-"}
                  </td>
                  

                  {/* Botones */}
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-1"
                      onClick={() => onEditar(proveedor)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onEliminar(proveedor.id)}
                    >
                      Eliminar
                    </button>
                  </td>

                </tr>
              ))

            ) : (

              // Si no hay registros mostramos mensaje
              <tr>
                <td colSpan="8" className="text-center text-muted py-3">
                  No hay proveedores registrados
                </td>
              </tr>

            )}

          </tbody>
        </table>
      </div>
    </div>
  );
}
