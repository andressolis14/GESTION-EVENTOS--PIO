import React, { useState } from "react";

const AuthForm = ({ onSubmit, isLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    onSubmit(formData).finally(() => setLoading(false));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-md p-6 flex flex-col gap-4 bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg shadow-xl text-white text-center"
    >
      <h1 className="text-2xl font-bold">
        {isLogin ? "Iniciar sesión" : "Registrarse"}
      </h1>

      <input
        type="email"
        name="email"
        placeholder="Correo electrónico"
        value={formData.email}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-md border focus:border-blue-700 focus:outline-none text-black"
      />

      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={handleChange}
        required
        className="w-full p-3 rounded-md border focus:border-blue-700 focus:outline-none text-black"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 text-lg font-bold rounded-md bg-blue-800 hover:bg-blue-900 transition-all text-white"
      >
        {loading ? "Cargando..." : isLogin ? "Iniciar sesión" : "Registrarse"}
      </button>
    </form>
  );
};

export default AuthForm;