import React from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/api";
import AuthForm from "../components/AuthForm";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      const { data } = await login(formData);
      localStorage.setItem("token", data.token);
      navigate("/events");
    } catch (err) {
      alert("Error al iniciar sesión");
    }
  };

  return <AuthForm onSubmit={handleLogin} isLogin />;
};

export default LoginPage;
