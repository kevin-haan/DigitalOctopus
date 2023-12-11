import { createContext, useState, useContext, useEffect } from "react";
import AuthService from "../services/Auth/AuthService";
import UserService from "../services/UserService";
import { useGlobalLoadingStatus } from "./GlobalLoadingStatusContext";

const AuthContext = createContext({ authData: null });

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { startGloballyLoading, stopGloballyLoading } =
    useGlobalLoadingStatus();

  useEffect(() => {
    startGloballyLoading();
    if (AuthService.checkAuthStatus()) {
      UserService.getUserData().then((userData) => {
        persistUser(userData);
        setIsAuthenticated;
        stopGloballyLoading();
      });
    }
  }, []);

  const persistUser = (userData) => {
    setAuthData(userData);
    // Hier könntest du auch andere Aktionen ausführen, wie z.B. das Token in der Axios-Instanz zu setzen
  };

  const forgetUser = () => {
    setAuthData(null);
    // Hier könntest du auch andere Aktionen ausführen, wie z.B. das Token in der Axios-Instanz zu setzen
  };

  const login = async (credentials) => {
    try {
      if (await AuthService.login(credentials)) {
        const userData = await UserService.getUserData();
        persistUser(userData);
        setIsAuthenticated(true); // Aktualisiere den Authentifizierungsstatus
        return true; // Login erfolgreich
      }
      return false; // Login nicht erfolgreich, aber kein Fehler
    } catch (error) {
      console.error("Login-Fehler", error.message);
      setIsAuthenticated(false); // Stelle sicher, dass der Authentifizierungsstatus zurückgesetzt wird
      return false; // Login fehlgeschlagen
    }
  };

  const logout = async () => {
    if (await AuthService.logout()) {
      forgetUser();
    }
    // Weitere Logout-Aktionen
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, authData, persistUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
