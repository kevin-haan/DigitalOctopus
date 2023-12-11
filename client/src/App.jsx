import { RouterProvider } from "react-router-dom";
import router from "./router";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/Layouts/Layout";
import { GlobalLoadingStatusProvider } from "./context/GlobalLoadingStatusContext";

function App() {
  return (
    <div>
      <GlobalLoadingStatusProvider>
        <AuthProvider>
          <RouterProvider router={router}>
            <Layout />
          </RouterProvider>
        </AuthProvider>
      </GlobalLoadingStatusProvider>
    </div>
  );
}

export default App;
