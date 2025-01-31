import React from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/api";
import AuthForm from "../components/AuthForm";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      await register(formData);
      alert("Usuario registrado con éxito");
      navigate("/login");
    } catch (err) {
      alert("Error al registrarse");
    }
  };

  return <AuthForm onSubmit={handleRegister} isLogin={false} />;
};

export default RegisterPage;
