
import "./Sidebar.css";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside style={{ width: 260, padding: 16, background: "#244b47", color: "#fff" }}>
      {/* Perfil */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 30 }}>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "#1b7f72",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 20,
          }}
        >
          {/* Icono */}
          <i className="bi bi-person-fill"></i>
        </div>

        <div>
          <strong>Mobilesco ERP</strong>
          <div style={{ fontSize: 12, opacity: 0.8 }}>Administrador</div>
        </div>
      </div>

      {/* Menú  de Opciones*/}
      <nav style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      
        <NavLink  //Dashboard
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

        <NavLink //Productos
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


       <div>
  {/* BOTÓN PADRE */}
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


  {/* SUBMENÚ */}
  <div className="collapse sidebar-submenu" id="menuProveedores">

    <NavLink
      to="/proveedores"
      className="sidebar-link"
    >
      <i className="bi bi-list-ul me-2"></i>
      Lista Proveedores
    </NavLink>

    <NavLink
      to="/proveedores/nuevo"
      className="sidebar-link"
    >
      <i className="bi-plus-circle me-2"> </i>
      Nuevo Proveedor
    </NavLink>

  </div>
</div>


          
        <NavLink //Insumos
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

         <div>
  {/* BOTÓN PADRE */}
  <button
    className="sidebar-parent"
    data-bs-toggle="collapse"
    data-bs-target="#menuUnidadesMedida" 
  >
    <div className="sidebar-parent-content">
      <i className="bi bi-rulers me-2"></i>    {/* 👈 Icono diferente */}
      <span>Unidades de Medida</span>          {/* 👈 Texto diferente */}
    </div>

    <i className="bi bi-chevron-down sidebar-chevron"></i>
  </button>

  {/* SUBMENÚ */}
  <div className="collapse sidebar-submenu" id="menuUnidadesMedida">  {/* 👈 ID diferente */}

    <NavLink
      to="/unidades-medida"                    
      className="sidebar-link"
    >
      <i className="bi bi-list-ul me-2"></i>
      Lista Unidades                            {/* 👈 Texto diferente */}
    </NavLink>

    <NavLink
      to="/unidades-medida/nuevo"               
      className="sidebar-link"
    >
      <i className="bi bi-plus-circle me-2"></i>
      Nueva Unidad                               {/* 👈 Texto diferente */}
    </NavLink>

  </div>
</div>

         <NavLink //Nueva Cotizacion
          to="/nuevaCotizacion"
          style={({ isActive }) => ({
            color: "#fff",
            textDecoration: "none",
            padding: "10px 12px",
            borderRadius: 10,
            background: isActive ? "#1b7f72" : "transparent",
          })}
        >
          <i className="bi-plus-circle"> </i>
          Nueva Cotizacion
        </NavLink> 

          <NavLink //Cotizaciones
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
