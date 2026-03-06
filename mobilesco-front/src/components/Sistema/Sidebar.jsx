import "./Sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { logout, getUser } from "../../services/authService";
import { useState, useRef, useEffect } from "react";

export default function Sidebar() {

  const navigate = useNavigate();
  const user = getUser();

  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  const nombre = user?.nombre || "";
  const apellido = user?.apellidoPaterno || "";

  const rolMap = {
    ADMIN: "Administrador",
    EMPLOYEE: "Empleado"
  };

  const rol = rolMap[user?.roles?.[0]] || user?.roles?.[0] || "";

  const foto = user?.fotoUrl
    ? `http://localhost:8081${user.fotoUrl}`
    : null;

  const handleLogout = async () => {

    try {
      await logout();
    } catch (e) {
      console.warn("Error logout:", e);
    }

    navigate("/login");

  };

  // cerrar dropdown si se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (

    <aside style={{ width: 260, padding: 16, background: "#244b47", color: "#fff" }}>

      {/* PERFIL */}
      <div
        ref={menuRef}
        style={{ position: "relative", marginBottom: 30 }}
      >

        <div
          onClick={() => setOpenMenu(!openMenu)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer"
          }}
        >

          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              background: "#1b7f72",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >

            {foto ? (
              <img
                src={foto}
                alt="perfil"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <i className="bi bi-person-fill"></i>
            )}

          </div>

          <div>
            <strong>{nombre} {apellido}</strong>
            <div style={{ fontSize: 12, opacity: 0.8 }}>{rol}</div>
          </div>

        </div>

        {/* DROPDOWN */}
        {openMenu && (

          <div
            style={{
              position: "absolute",
              top: 55,
              left: 0,
              width: "100%",
              background: "#2f5e58",
              borderRadius: 8,
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
              overflow: "hidden"
            }}
          >

            <button
              onClick={handleLogout}
              style={{
                width: "100%",
                border: "none",
                background: "transparent",
                color: "#fff",
                padding: "10px 12px",
                textAlign: "left",
                cursor: "pointer"
              }}
            >
              <i className="bi bi-box-arrow-right me-2"></i>
              Cerrar sesión
            </button>

          </div>

        )}

      </div>

      {/* MENÚ */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>

        {/* Dashboard */}
        <NavLink
          to="/tablero"
          style={({ isActive }) => ({
            color: "#fff",
            textDecoration: "none",
            padding: "10px 12px",
            borderRadius: 10,
            background: isActive ? "#1b7f72" : "transparent",
          })}
        >
          <i className="bi bi-speedometer2 me-2"></i>
          Tablero
        </NavLink>


        {/* Productos */}
        <NavLink
          to="/productos"
          style={({ isActive }) => ({
            color: "#fff",
            textDecoration: "none",
            padding: "10px 12px",
            borderRadius: 10,
            background: isActive ? "#1b7f72" : "transparent",
          })}
        >
          <i className="bi bi-box-seam me-2"></i>
          Productos
        </NavLink>


        {/* EMPLEADOS */}
        <div>

          <button
            className="sidebar-parent"
            data-bs-toggle="collapse"
            data-bs-target="#menuEmpleados"
          >
            <div className="sidebar-parent-content">
              <i className="bi bi-people me-2"></i>
              <span>Empleados</span>
            </div>

            <i className="bi bi-chevron-down sidebar-chevron"></i>
          </button>

          <div className="collapse sidebar-submenu" id="menuEmpleados">

            <NavLink to="/empleados" className="sidebar-link">
              <i className="bi bi-list-ul me-2"></i>
              Lista Empleados
            </NavLink>

            <NavLink to="/empleados/nuevo" className="sidebar-link">
              <i className="bi bi-plus-circle me-2"></i>
              Nuevo Empleado
            </NavLink>

          </div>

        </div>


        {/* PROVEEDORES */}
        <div>

          <button
            className="sidebar-parent"
            data-bs-toggle="collapse"
            data-bs-target="#menuProveedores"
          >
            <div className="sidebar-parent-content">
              <i className="bi bi-truck me-2"></i>
              <span>Proveedores</span>
            </div>

            <i className="bi bi-chevron-down sidebar-chevron"></i>
          </button>

          <div className="collapse sidebar-submenu" id="menuProveedores">

            <NavLink to="/proveedores" className="sidebar-link">
              <i className="bi bi-list-ul me-2"></i>
              Lista Proveedores
            </NavLink>

            <NavLink to="/proveedores/nuevo" className="sidebar-link">
              <i className="bi bi-plus-circle me-2"></i>
              Nuevo Proveedor
            </NavLink>

          </div>

        </div>


        {/* Insumos */}
        <NavLink
          to="/insumos"
          style={({ isActive }) => ({
            color: "#fff",
            textDecoration: "none",
            padding: "10px 12px",
            borderRadius: 10,
            background: isActive ? "#1b7f72" : "transparent",
          })}
        >
          <i className="bi bi-tools me-2"></i>
          Insumos
        </NavLink>


        {/* UNIDADES DE MEDIDA */}
        <div>

          <button
            className="sidebar-parent"
            data-bs-toggle="collapse"
            data-bs-target="#menuUnidadesMedida"
          >
            <div className="sidebar-parent-content">
              <i className="bi bi-rulers me-2"></i>
              <span>Unidades de Medida</span>
            </div>

            <i className="bi bi-chevron-down sidebar-chevron"></i>
          </button>

          <div className="collapse sidebar-submenu" id="menuUnidadesMedida">

            <NavLink to="/unidades-medida" className="sidebar-link">
              <i className="bi bi-list-ul me-2"></i>
              Lista Unidades
            </NavLink>

            <NavLink to="/unidades-medida/nuevo" className="sidebar-link">
              <i className="bi bi-plus-circle me-2"></i>
              Nueva Unidad
            </NavLink>

          </div>

        </div>


        {/* Nueva Cotización */}
        <NavLink
          to="/nuevaCotizacion"
          style={({ isActive }) => ({
            color: "#fff",
            textDecoration: "none",
            padding: "10px 12px",
            borderRadius: 10,
            background: isActive ? "#1b7f72" : "transparent",
          })}
        >
          <i className="bi bi-plus-circle me-2"></i>
          Nueva Cotización
        </NavLink>


        {/* Cotizaciones */}
        <NavLink
          to="/cotizaciones"
          style={({ isActive }) => ({
            color: "#fff",
            textDecoration: "none",
            padding: "10px 12px",
            borderRadius: 10,
            background: isActive ? "#1b7f72" : "transparent",
          })}
        >
          <i className="bi bi-list-ul me-2"></i>
          Cotizaciones
        </NavLink>

      </nav>

    </aside>

  );

}