import {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import AuthService from "../services/Auth/AuthService";
import UserService from "../services/UserService";
import { useGlobalLoadingStatus } from "./GlobalLoadingStatusContext";
import { toast } from "react-toastify";
import { PiHandWavingLight } from "react-icons/pi";

const AuthContext = createContext({ authData: null });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { startGloballyLoading, stopGloballyLoading } =
    useGlobalLoadingStatus();

  useEffect(() => {
    const checkAuthentication = async () => {
      startGloballyLoading();
      if (await AuthService.checkAuthStatus()) {
        try {
          const userData = await UserService.getUserData();
          persistUser(userData);
          setIsAuthenticated(true);
        } catch (error) {
          console.error("Fehler beim Abrufen der Benutzerdaten", error);
          // Optional: Handle Error State
        } finally {
          stopGloballyLoading();
        }
      } else {
        stopGloballyLoading();
      }
    };

    checkAuthentication();
  }, [startGloballyLoading, stopGloballyLoading]);

  const persistUser = (userData) => {
    setAuthData(userData);
    // Hier könntest du auch andere Aktionen ausführen, wie z.B. das Token in der Axios-Instanz zu setzen
  };

  const forgetUser = () => {
    setAuthData(null);
    // Hier könntest du auch andere Aktionen ausführen, wie z.B. das Token in der Axios-Instanz zu setzen
  };

  const login = useCallback(async (credentials) => {
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
  }, []);

  const register = useCallback(
    async (data) => {
      try {
        const registerResponse = await AuthService.register(data);
        if (registerResponse.success) {
          const loginResponse = await login({
            email: data.email,
            password: data.password,
          });
          return { success: true, data: loginResponse };
        } else {
          return { success: false, errors: registerResponse.errors };
        }
      } catch (error) {
        console.error("Registrierungsfehler", error.message);
        return {
          success: false,
          errors: { general: "Ein unbekannter Fehler ist aufgetreten." },
        };
      }
    },
    [login]
  );

  const logout = useCallback(async () => {
    if (await AuthService.logout()) {
      toast("You have signed out.", {
        icon: PiHandWavingLight,
      });
      setIsAuthenticated(false);
      forgetUser();
    }
    // Weitere Logout-Aktionen
  }, []);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      authData,
      persistUser,
      login,
      logout,
      register,
    }),
    [isAuthenticated, authData, login, logout, register]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
