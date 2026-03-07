import { Navigate, Route, Routes } from "react-router-dom";

import AppLayout from "./layout/AppLayout";

import Tablero from "./pages/Tablero";
import Productos from "./pages/Productos";
import Insumos from "./pages/Insumos.jsx";
import UnidadMedida from "./pages/UnidadMedida.jsx";
import NuevaCotizacion from "./pages/NuevaCotizacion.jsx";
import Cotizacion from "./pages/Cotizaciones.jsx";

import ProveedoresPage from "./pages/Proveedores/ProveedoresPage.jsx";
import ProveedorFormPage from "./pages/Proveedores/ProveedorFormPage.jsx";

import UnidadesMedidaPage from "./pages/UnidadMedidas/UnidadMedidaPage.jsx";
import UnidadMedidaFormPage from "./pages/UnidadMedidas/UnidadMedidaFormPage.jsx";

import Login from "./pages/auth/Login.jsx";

import EmpleadoFormPage from "./pages/Empleados/EmpleadoFormPage.jsx";
import EmpleadosPage from "./pages/Empleados/EmpleadoPage.jsx";

import PerfilPage from "./pages/Perfil/PerfilPage.jsx";

import ProtectedRoute from "./components/auth/ProtectedRoute";

export default function App() {

  return (

    <Routes>

      {/* LOGIN */}
      <Route path="/login" element={<Login />} />

      {/* REDIRECCIÓN INICIAL */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* RUTAS PROTEGIDAS */}
      <Route
        element={
          <ProtectedRoute>
            <AppLayout />
          </ProtectedRoute>
        }
      >

        <Route path="/tablero" element={<Tablero />} />

        <Route path="/productos" element={<Productos />} />

        <Route path="/insumos" element={<Insumos />} />

        <Route path="/unidadMedida" element={<UnidadMedida />} />

        <Route path="/nuevaCotizacion" element={<NuevaCotizacion />} />

        <Route path="/cotizaciones" element={<Cotizacion />} />

        {/* EMPLEADOS */}
        <Route path="/empleados/nuevo" element={<EmpleadoFormPage />} />
        <Route path="/empleados/:id" element={<EmpleadoFormPage />} />
        <Route path="/empleados" element={<EmpleadosPage />} />

        <Route path="/perfil" element={<PerfilPage />} />

        {/* PROVEEDORES */}
        <Route path="/proveedores" element={<ProveedoresPage />} />
        <Route path="/proveedores/nuevo" element={<ProveedorFormPage />} />
        <Route path="/proveedores/:id" element={<ProveedorFormPage />} />

        {/* UNIDADES DE MEDIDA */}
        <Route path="/unidades-medida" element={<UnidadesMedidaPage />} />
        <Route path="/unidades-medida/nuevo" element={<UnidadMedidaFormPage />} />
        <Route path="/unidades-medida/:id" element={<UnidadMedidaFormPage />} />

      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>

  );

}