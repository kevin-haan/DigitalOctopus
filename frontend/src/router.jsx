import { createBrowserRouter } from "react-router-dom";
import indexRoutes from "./routes/indexRoutes";
import homeRoutes from "./routes/homeRoutes";
import authRoutes from "./routes/Auth/authRoutes";
import designerRoutes from "./routes/Designer/designerRoutes";
import Layout from "./components/Layouts/Layout";
import adminRoutes from "./routes/Admin/adminRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      ...indexRoutes,
      ...authRoutes,
      ...homeRoutes,
      ...designerRoutes,
      ...adminRoutes,
    ],
  },
]);

export default router;
