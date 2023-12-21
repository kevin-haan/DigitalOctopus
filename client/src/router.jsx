import { createBrowserRouter } from "react-router-dom";
import indexRoutes from "./routes/indexRoutes";
import homeRoutes from "./routes/homeRoutes";
import authRoutes from "./routes/authRoutes";
import designerRoutes from "./routes/designerRoutes";
import Layout from "./components/Layouts/Layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [...indexRoutes, ...authRoutes, ...homeRoutes, ...designerRoutes],
  },
]);

export default router;
