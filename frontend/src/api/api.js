import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Middleware para agregar token
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    // Asegurando que el token se envíe en el formato correcto
    req.headers['Authorization'] = `Bearer ${token}`;
  }
  return req;
});

export const register = (data) => API.post("/auth/register", data);
export const login = (data) => API.post("/auth/login", data);
export const createEvent = (data) => API.post("/events", data);
export const getEvents = () => API.get("/events");
export const deleteEvent = (id) => API.delete(`/events/${id}`); // Función para eliminar un evento
export const updateEvent = (id, data) => API.put(`/events/${id}`, data); // Función para editar un evento
export const filterEvents = (filters) => API.get(`/events/filter`, { params: filters }); // Función para filtrar eventos

export default API;
