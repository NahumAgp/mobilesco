// pages/Productos/ProductoDetallePage.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { obtenerProductoPorId, calcularCostoProducto } from "../../services/productos.js";
import { obtenerCostoPromedio } from "../../services/kardex.js";
import Card from "../../components/ui/Card.jsx";
import Toast from "../../components/ui/Toast.jsx";

export default function ProductoDetallePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [costo, setCosto] = useState(0);
  const [costosInsumos, setCostosInsumos] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    cargarProducto();
  }, [id]);

  const cargarProducto = async () => {
    try {
      setLoading(true);
      const data = await obtenerProductoPorId(id);
      setProducto(data);
      
      // Calcular costo total
      const costoData = await calcularCostoProducto(id);
      setCosto(costoData);
      
      // Cargar costos individuales de cada insumo
      if (data.insumos && data.insumos.length > 0) {
        const costos = {};
        await Promise.all(
          data.insumos.map(async (insumo) => {
            try {
              const costoUnitario = await obtenerCostoPromedio(insumo.insumoId);
              costos[insumo.insumoId] = costoUnitario;
            } catch (error) {
              console.error(`Error cargando costo del insumo ${insumo.insumoId}:`, error);
              costos[insumo.insumoId] = 0;
            }
          })
        );
        setCostosInsumos(costos);
      }
    } catch (e) {
      setError("Error cargando el producto");
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2
    }).format(value || 0);
  };

  // Calcular subtotal por insumo
  const calcularSubtotal = (insumo) => {
    const costoUnitario = costosInsumos[insumo.insumoId] || 0;
    const cantidadConDesperdicio = insumo.cantidad * (1 + (insumo.desperdicioPorcentaje || 0) / 100);
    return cantidadConDesperdicio * costoUnitario;
  };

  // Calcular total de BOM
  const totalBOM = producto?.insumos?.reduce((sum, insumo) => sum + calcularSubtotal(insumo), 0) || 0;

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      </div>
    );
  }

  if (error || !producto) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error || "Producto no encontrado"}</div>
        <button className="btn btn-primary" onClick={() => navigate("/productos")}>
          Volver a Productos
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Toast message={toastMessage} type="success" onClose={() => setToastMessage("")} />
      
      <div className="d-flex align-items-center justify-content-between mb-3">
        <h3>
          <i className="bi bi-box me-2"></i>
          Producto: {producto.nombre}
        </h3>
        <div>
          <button 
            className="btn btn-outline-primary me-2"
            onClick={() => navigate(`/productos/${id}`)}
          >
            <i className="bi bi-pencil me-2"></i>
            Editar
          </button>
          <button className="btn btn-outline-secondary" onClick={() => navigate("/productos")}>
            <i className="bi bi-arrow-left me-2"></i>
            Volver
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4">
          <Card title="Información General" icon="bi-info-circle">
            <table className="table table-sm">
              <tbody>
                <tr><th>SKU:</th><td><span className="badge bg-secondary">{producto.sku}</span></td></tr>
                <tr><th>Nombre:</th><td>{producto.nombre}</td></tr>
                <tr><th>Descripción:</th><td>{producto.descripcion || '-'}</td></tr>
                <tr><th>Estado:</th><td>
                  <span className={`badge bg-${producto.activo ? 'success' : 'secondary'}`}>
                    {producto.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td></tr>
              </tbody>
            </table>
          </Card>
        </div>

        <div className="col-md-4">
          <Card title="Clasificación" icon="bi-tags">
            <table className="table table-sm">
              <tbody>
                <tr><th>Tipo:</th><td>{producto.tipoProductoNombre}</td></tr>
                <tr><th>Línea:</th><td>{producto.lineaNombre || '-'}</td></tr>
                <tr><th>Categoría:</th><td>{producto.categoriaNombre || '-'}</td></tr>
                <tr><th>Material:</th><td>{producto.materialNombre || '-'}</td></tr>
              </tbody>
            </table>
          </Card>
        </div>

        <div className="col-md-4">
          <Card title="Costos" icon="bi-calculator">
            <table className="table table-sm">
              <tbody>
                <tr><th>Costo estimado:</th><td className="fw-bold text-primary fs-5">{formatCurrency(costo)}</td></tr>
                <tr><th>Costo BOM:</th><td className="fw-bold text-success">{formatCurrency(totalBOM)}</td></tr>
                <tr><th>Diferencia:</th><td className={totalBOM > 0 ? (totalBOM > costo ? 'text-danger' : 'text-success') : ''}>
                  {formatCurrency(totalBOM - costo)}
                </td></tr>
              </tbody>
            </table>
          </Card>
        </div>
      </div>

      <Card title="Lista de Materiales (BOM)" icon="bi-list-check">
        {producto.insumos && producto.insumos.length > 0 ? (
          <>
            <div className="table-responsive">
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th>Insumo</th>
                    <th className="text-end">Cantidad</th>
                    <th>Unidad</th>
                    <th className="text-end">% Desp.</th>
                    <th className="text-end">Cantidad Total</th>
                    <th className="text-end">Costo Unitario</th>
                    <th className="text-end">Subtotal</th>
                    <th>Observaciones</th>
                  </tr>
                </thead>
                <tbody>
                  {producto.insumos.map((insumo) => {
                    const costoUnitario = costosInsumos[insumo.insumoId] || 0;
                    const cantidadConDesperdicio = insumo.cantidad * (1 + (insumo.desperdicioPorcentaje || 0) / 100);
                    const subtotal = cantidadConDesperdicio * costoUnitario;
                    
                    return (
                      <tr key={insumo.id}>
                        <td>
                          <span className="fw-semibold">{insumo.insumoNombre}</span>
                          <button 
                            className="btn btn-link btn-sm p-0 ms-2"
                            onClick={() => navigate(`/insumos/${insumo.insumoId}`)}
                            title="Ver insumo"
                          >
                            <i className="bi bi-box-arrow-up-right"></i>
                          </button>
                        </td>
                        <td className="text-end">{insumo.cantidad.toFixed(2)}</td>
                        <td>{insumo.insumoUnidad}</td>
                        <td className="text-end">{insumo.desperdicioPorcentaje?.toFixed(2) || '0.00'}%</td>
                        <td className="text-end fw-bold">{cantidadConDesperdicio.toFixed(2)}</td>
                        <td className="text-end text-info">{formatCurrency(costoUnitario)}</td>
                        <td className="text-end text-primary">{formatCurrency(subtotal)}</td>
                        <td><small className="text-muted">{insumo.observaciones || '-'}</small></td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot className="table-light">
                  <tr>
                    <td colSpan="6" className="text-end fw-bold">TOTAL BOM:</td>
                    <td className="text-end fw-bold text-success fs-5">{formatCurrency(totalBOM)}</td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="text-end mt-3">
              <button 
                className="btn btn-outline-primary"
                onClick={() => navigate(`/productos/${id}/bom`)}
              >
                <i className="bi bi-pencil-square me-1"></i>
                Editar BOM
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-4">
            <i className="bi bi-clipboard-x fs-1 d-block mb-3 text-secondary"></i>
            <p className="text-muted">Este producto no tiene insumos registrados</p>
            <button 
              className="btn btn-primary"
              onClick={() => navigate(`/productos/${id}/bom`)}
            >
              <i className="bi bi-plus-circle me-2"></i>
              Agregar materiales
            </button>
          </div>
        )}
      </Card>
    </div>
  );
}