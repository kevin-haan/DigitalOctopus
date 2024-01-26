import axios from "axios";
import CsrfService from "../services/CsrfService";

// Setze die Basis-URL für alle Anfragen
axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;

// Request-Interceptor
axios.interceptors.request.use(
  async (config) => {
    // Überprüft, ob die Methode ein POST-Request ist
    if (config.method === "post") {
      const csrfToken = await CsrfService.fetchCsrfToken();
      config.headers["CSRF-Token"] = csrfToken;
      // Weitere Header-Konfigurationen für POST-Requests hier
    }
    // Für nicht POST-Requests wird keine CSRF-Token-Logik angewendet
    return config;
  },
  (error) => {
    // Fehlerbehandlung für Request-Interceptor
    return Promise.reject(error);
  }
);

export default axios;
