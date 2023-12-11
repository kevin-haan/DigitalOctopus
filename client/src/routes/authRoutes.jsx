import { useAuth } from "../context/AuthContext";
import Login from "../pages/Auth/Login";
import ProtectedRoute from "./ProtectedRoute";

export const authRoutes = [
  {
    path: "/login",
    element: (
      // <ProtectedRoute>
      <Login />
      // </ProtectedRoute>
    ),
  },
  // Weitere Auth-Routen...
];

export default authRoutes;
