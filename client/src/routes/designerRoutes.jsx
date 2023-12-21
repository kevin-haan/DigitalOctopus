import Designer from "../pages/Designer/Designer";
import { DesignerProvider } from "../context/DesignerDataContext";
export const designerRoutes = [
  {
    path: "/designer",
    element: (
      <DesignerProvider>
        <Designer />
      </DesignerProvider>
    ),
  },
];

export default designerRoutes;
