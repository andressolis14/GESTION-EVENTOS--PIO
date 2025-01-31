import React, { useEffect, useState } from "react";
import { getEvents, createEvent, deleteEvent, updateEvent, filterEvents } from "../api/api";
import { useNavigate } from "react-router-dom"; // Importar para redirigir

const EventPage = () => {
    const [events, setEvents] = useState([]);
    const [eventData, setEventData] = useState({
        name: "",
        date: "",
        time: "",
        location: "",
        description: "",
    });
    const [filters, setFilters] = useState({ date: "", location: "" });
    const navigate = useNavigate(); // Inicializar navigate

    const fetchEvents = async () => {
        try {
            const { data } = await getEvents();
            setEvents(data);
        } catch (err) {
            alert("Error al cargar eventos");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (eventData._id) {
                await updateEvent(eventData._id, eventData);
            } else {
                await createEvent(eventData);
            }
            fetchEvents();
            setEventData({ name: "", date: "", time: "", location: "", description: "" });
        } catch (err) {
            alert("Error al guardar el evento");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteEvent(id);
            fetchEvents();
        } catch (err) {
            alert("Error al eliminar evento");
        }
    };

    const handleEdit = (event) => {
        setEventData(event);
    };

    const handleFilter = async () => {
        try {
            const { data } = await filterEvents(filters);
            setEvents(data);
        } catch (err) {
            alert("Error al filtrar eventos");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token"); // Eliminar el token del localStorage
        navigate("/"); // Redirigir al usuario a la página de inicio (ajustar la ruta según sea necesario)
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <div className="p-8 bg-gradient-to-r from-blue-900 to-purple-700 min-h-screen">
            <h1 className="text-4xl font-extrabold text-white text-center mb-8">Gestión de Eventos</h1>

            {/* Botón de cerrar sesión */}
            <button onClick={handleLogout} className="bg-red-600 text-white py-2 px-6 rounded-full shadow-md hover:bg-red-700 transition-all mb-6">
                Cerrar Sesión
            </button>

            {/* Contenedor para las cajas de crear y filtrar eventos */}
            <div className="flex gap-8 mb-8">
                {/* Crear Evento */}
                <div className="w-1/2">
                    <div className="bg-white p-8 rounded-2xl shadow-lg">
                        <h2 className="text-2xl font-semibold text-blue-700 mb-4">{eventData._id ? "Editar Evento" : "Crear Evento"}</h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input type="text" placeholder="Nombre del evento" value={eventData.name} onChange={(e) => setEventData({ ...eventData, name: e.target.value })} className="w-full p-4 border-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            <input type="date" value={eventData.date} onChange={(e) => setEventData({ ...eventData, date: e.target.value })} className="w-full p-4 border-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            <input type="time" value={eventData.time} onChange={(e) => setEventData({ ...eventData, time: e.target.value })} className="w-full p-4 border-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            <input type="text" placeholder="Ubicación" value={eventData.location} onChange={(e) => setEventData({ ...eventData, location: e.target.value })} className="w-full p-4 border-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                            <textarea placeholder="Descripción" value={eventData.description} onChange={(e) => setEventData({ ...eventData, description: e.target.value })} className="w-full p-4 border-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500" rows="4"></textarea>
                            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-full hover:bg-blue-700 transition-all shadow-lg">{eventData._id ? "Guardar Cambios" : "Crear Evento"}</button>
                        </form>
                    </div>
                </div>

                {/* Filtro de Eventos */}
                <div className="w-1/2">
                    <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
                        <h2 className="text-2xl font-semibold text-blue-700 mb-4">Filtrar Eventos</h2>
                        <div className="flex gap-4">
                            <input type="date" value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} className="w-full p-4 border-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <input type="text" placeholder="Ubicación" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} className="w-full p-4 border-2 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            <button onClick={handleFilter} className="bg-blue-600 text-white py-3 px-6 rounded-full hover:bg-blue-700 transition-all shadow-lg">Filtrar</button>
                        </div>
                    </div>

                    {/* Lista de Eventos */}
                    <h2 className="text-3xl font-semibold text-white mb-6">Lista de Eventos</h2>
                    <ul className="space-y-6">
                        {events.map((event) => (
                            <li key={event._id} className="bg-white p-6 rounded-2xl shadow-xl flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-semibold text-blue-600">{event.name}</h3>
                                    <p className="text-gray-600">{event.date} - {event.time}</p>
                                    <p className="text-gray-600">Ubicación: {event.location}</p>
                                </div>
                                <div className="flex gap-4">
                                    <button onClick={() => handleEdit(event)} className="bg-yellow-500 text-white py-2 px-4 rounded-full hover:bg-yellow-600 transition-all shadow-md">Editar</button>
                                    <button onClick={() => handleDelete(event._id)} className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition-all shadow-md">Eliminar</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default EventPage;
