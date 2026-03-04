package com.mobilesco.mobilesco_back.config;

public final class ApiPaths {

    private ApiPaths() {
        // Evita instanciación
    }

    // =============================
    // 🔹 VERSION
    // =============================
    public static final String API_VERSION = "/api/v1";

    // =============================
    // 🔹 DOMINIOS
    // =============================
    public static final String AUTH = API_VERSION + "/auth";
    public static final String PROVEEDORES = API_VERSION + "/proveedores";
    public static final String UNIDADES_MEDIDA = API_VERSION + "/unidades-medida";
    public static final String PRODUCTOS = API_VERSION + "/productos";
    public static final String CLIENTES = API_VERSION + "/clientes";
    public static final String COTIZACIONES = API_VERSION + "/cotizaciones";

}
