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
import FamiliasPage from "./pages/Familias/FamiliasPage.jsx";
import FamiliaFormPage from "./pages/Familias/FamiliaFormPage.jsx";
import LineaProductoForm from "./pages/LineaProducto/LineaProductoFormPage.jsx";
import LineaProductoFormPage from "./pages/LineaProducto/LineaProductoFormPage.jsx";
import LineaProductoPage from "./pages/LineaProducto/LineaProductoPage.jsx";
import CategoriaPage from "./pages/Categoria/CategoriaPage.jsx";
import CategoriaFromPage from "./pages/Categoria/CategoriaFormPage.jsx";
import CategoriaFormPage from "./pages/Categoria/CategoriaFormPage.jsx";
import MaterialesPage from "./pages/Materiales/MaterialesPage.jsx";
import MaterialFormPage from "./pages/Materiales/MaterialFormPage.jsx";
import TiposProductoPage from"./pages/TiposProducto/TiposProductoPage.jsx";
import TiposProductoFromPage from"./pages/TiposProducto/TipoProductoFormPage.jsx";

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

        {/* FAMILIAS */}
         <Route path="/familias" element={<FamiliasPage />} />
         <Route path="/familias/nuevo" element={<FamiliaFormPage />} />
         <Route path="/familias/:id" element={<FamiliaFormPage />} />

        {/* LINEA - PRODUCTO */}
        <Route path="/lineas-producto" element={<LineaProductoPage />} />
        <Route path="/lineas-producto/nuevo" element={<LineaProductoFormPage />} />
        <Route path="/lineas-producto/:id" element={<LineaProductoFormPage />} />

        {/* CATEGORIA */}
        <Route path="/categorias" element={<CategoriaPage />} />
        <Route path="/categorias/nuevo" element={<CategoriaFormPage />} />
        <Route path="/categorias/:id" element={<CategoriaFormPage />} />

        {/* MATERIALES */}
        <Route path="/materiales" element={<MaterialesPage />} />
        <Route path="/materiales/nuevo" element={<MaterialFormPage />} />
        <Route path="/materiales/:id" element={<MaterialFormPage />} />

        {/* TIPOS PRODUCTO */}
        <Route path="/tipos-producto" element={<TiposProductoPage />} />
        <Route path="/tipos-producto/nuevo" element={<TiposProductoFromPage />} />
        <Route path="/tipos-producto/:id" element={<TiposProductoFromPage />} />

      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/login" replace />} />
      

    </Routes>

  );

}