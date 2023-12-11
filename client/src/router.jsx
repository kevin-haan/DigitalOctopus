import { createBrowserRouter } from "react-router-dom";
import homeRoutes from "./routes/homeRoutes";
import authRoutes from "./routes/authRoutes";
import Layout from "./components/Layouts/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [...authRoutes, ...homeRoutes],
  },
]);

export default router;
