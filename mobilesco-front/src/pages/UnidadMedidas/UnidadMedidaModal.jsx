import React, { useState, useEffect } from "react";
import { obtenerUnidadesMedida } from "../../services/unidadMedidaService";

export default function UnidadMedidaModal({ show, onClose, onSelect }) {
  const [unidades, setUnidades] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      cargarUnidades();
    }
  }, [show]);

  const cargarUnidades = async () => {
    try {
      setLoading(true);
      const data = await obtenerUnidadesMedida();
      setUnidades(data.filter(u => u.activo)); // Solo activas para selección
    } catch (error) {
      console.error("Error al cargar unidades:", error);
    } finally {
      setLoading(false);
    }
  };

  const unidadesFiltradas = unidades.filter(u => {
    const termino = busqueda.toLowerCase();
    return u.nombre.toLowerCase().includes(termino) ||
           u.abreviatura.toLowerCase().includes(termino);
  });

  if (!show) return null;

  return (
    <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Seleccionar Unidad de Medida</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar por nombre o abreviatura..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>

            {loading ? (
              <div className="text-center">Cargando...</div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Abreviatura</th>
                      <th>Descripción</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {unidadesFiltradas.length === 0 ? (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No hay unidades de medida activas
                        </td>
                      </tr>
                    ) : (
                      unidadesFiltradas.map((unidad) => (
                        <tr key={unidad.id}>
                          <td>{unidad.nombre}</td>
                          <td>{unidad.abreviatura}</td>
                          <td>{unidad.descripcion || '-'}</td>
                          <td>
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => {
                                onSelect(unidad);
                                onClose();
                              }}
                            >
                              Seleccionar
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}