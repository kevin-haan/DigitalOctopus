// src/components/Layout.js
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { ToastContainer } from "react-toastify";
import { Slide } from "react-toastify";
function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ToastContainer
        transition={Slide}
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        // Hier kannst du die Standardklassen überschreiben
        toastClassName="custom-toast"
        bodyClassName="custom-body"
        progressClassName="custom-toast-progress-bar"
      />
      <Header />
      <main className=" flex-grow flex">
        <Outlet /> {/* Hier werden die Komponenten der Unterrouten gerendert */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
