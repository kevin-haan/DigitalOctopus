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
import { handleErrorResponse } from "../utils/serviceUtils";

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
      try {
        const isAuthenticated = await AuthService.checkAuthStatus();
        if (isAuthenticated) {
          const userData = await UserService.getUserData();
          persistUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Benutzerdaten", error);
        // Optional: Handle Error State
      } finally {
        stopGloballyLoading();
      }
    };

    checkAuthentication();
  }, [startGloballyLoading, stopGloballyLoading]);

  const persistUser = useCallback((userData) => {
    setAuthData(userData);
    // Hier könntest du auch andere Aktionen ausführen, wie z.B. das Token in der Axios-Instanz zu setzen
  }, []);

  const forgetUser = useCallback(() => {
    setAuthData(null);
    // Hier könntest du auch andere Aktionen ausführen, wie z.B. das Token in der Axios-Instanz zu setzen
  }, []);

  const login = useCallback(
    async (data) => {
      try {
        const loginResponse = await AuthService.login(data);

        if (loginResponse.success) {
          const userData = await UserService.getUserData();
          persistUser(userData);
          setIsAuthenticated(true);
          return { success: true, data: loginResponse };
        } else {
          setIsAuthenticated(false);
          return { success: false, errors: loginResponse.errors };
        }
      } catch (error) {
        return handleErrorResponse(error);
      }
    },
    [persistUser]
  );

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
        return handleErrorResponse(error);
      }
    },
    [login]
  );

  const logout = useCallback(async () => {
    const logoutResponse = await AuthService.logout();
    if (logoutResponse.success) {
      toast("You have signed out.", {
        icon: PiHandWavingLight,
      });
      setIsAuthenticated(false);
      forgetUser();
    }
    // Weitere Logout-Aktionen
  }, [forgetUser]);

  const contextValue = useMemo(
    () => ({
      isAuthenticated,
      authData,
      persistUser,
      login,
      logout,
      register,
    }),
    [isAuthenticated, authData, login, logout, persistUser, register]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
