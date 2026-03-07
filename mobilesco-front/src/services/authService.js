import request from "./api";
import { API_PATHS } from "../config/apiPaths";

// ============================
// LOGIN
// ============================
export function login(credentials) {

  return request(API_PATHS.AUTH_LOGIN, {
    method: "POST",
    body: JSON.stringify(credentials)
  });

}


// ============================
// OBTENER USUARIO ACTUAL
// ============================
export function getCurrentUser() {

  return request(API_PATHS.AUTH_ME);

}


// ============================
// LOGOUT
// ============================
export async function logout() {

  const refreshToken = localStorage.getItem("refreshToken");

  try {

    if (refreshToken) {

      await request(API_PATHS.AUTH_LOGOUT, {
        method: "POST",
        body: JSON.stringify({
          refreshToken
        })
      });

    }

  } catch (error) {

    console.warn("Error en logout backend:", error);

  }

  // limpiar sesión local
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");

}


// ============================
// TOKEN
// ============================
export function getToken() {

  return localStorage.getItem("token");

}


// ============================
// USUARIO LOCAL
// ============================
export function getUser() {

  const user = localStorage.getItem("user");

  return user ? JSON.parse(user) : null;

}


// ============================
// AUTENTICACIÓN
// ============================
export function isAuthenticated() {

  const token = localStorage.getItem("token");

  if (!token || token === "null" || token === "undefined") {
    return false;
  }

  return true;

}