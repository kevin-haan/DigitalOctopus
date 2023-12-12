import { createBrowserRouter } from "react-router-dom";
import indexRoutes from "./routes/indexRoutes";
import homeRoutes from "./routes/homeRoutes";
import authRoutes from "./routes/authRoutes";
import Layout from "./components/Layouts/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [...indexRoutes, ...authRoutes, ...homeRoutes],
  },
]);

export default router;
