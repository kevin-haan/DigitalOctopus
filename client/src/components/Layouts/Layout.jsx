// src/components/Layout.js
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import { ToastContainer } from "react-toastify";

function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto px-4 flex-grow">
        <ToastContainer />
        <Outlet /> {/* Hier werden die Komponenten der Unterrouten gerendert */}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
