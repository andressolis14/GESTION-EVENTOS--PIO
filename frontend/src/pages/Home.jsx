import React from "react";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus, FaCalendarAlt } from "react-icons/fa";

function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white text-center">
      <h1 className="text-4xl font-bold mb-8">Bienvenido a la Gestión de Eventos</h1>
      <nav className="flex flex-col items-center gap-4">
        <Link to="/login" className="w-72 px-6 py-3 text-lg font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center shadow-md transition-transform transform hover:scale-105">
          <FaSignInAlt className="mr-3" /> Iniciar Sesión
        </Link>
        <Link to="/register" className="w-72 px-6 py-3 text-lg font-medium bg-green-500 hover:bg-green-600 text-white rounded-lg flex items-center justify-center shadow-md transition-transform transform hover:scale-105">
          <FaUserPlus className="mr-3" /> Registrarse
        </Link>
      </nav>
    </div>
  );
}

export default Home;
