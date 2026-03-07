const API_BASE_URL = "http://localhost:8081";

async function request(endpoint, options = {}) {

  if (!endpoint) {
    throw new Error("Endpoint no definido");
  }

  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  if (options.body instanceof FormData) {
    delete headers["Content-Type"];
  }

  const config = {
    ...options,
    headers
  };

  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint}`;

  try {

    const response = await fetch(url, config);

    const text = await response.text(); // solo se lee una vez

    let data = null;

    if (text) {
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
    }

    if (!response.ok) {
      console.error("❌ Backend response:", data);
      throw new Error(
        data?.message ||
        data?.error ||
        "Error del servidor"
      );
    }

    return data;

  } catch (error) {

    console.error("❌ Error en request:", error);
    throw error;

  }
}

export default request;