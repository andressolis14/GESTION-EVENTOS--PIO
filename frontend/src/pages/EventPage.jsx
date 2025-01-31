import React, { useEffect, useState } from "react";
import { getEvents, createEvent, deleteEvent, updateEvent, filterEvents } from "../api/api";

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

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-600 text-center mb-6">Gestión de Eventos</h1>
      
      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">{eventData._id ? "Editar Evento" : "Crear Evento"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Nombre del evento" value={eventData.name} onChange={(e) => setEventData({ ...eventData, name: e.target.value })} className="w-full p-2 border rounded" required />
          <input type="date" value={eventData.date} onChange={(e) => setEventData({ ...eventData, date: e.target.value })} className="w-full p-2 border rounded" required />
          <input type="time" value={eventData.time} onChange={(e) => setEventData({ ...eventData, time: e.target.value })} className="w-full p-2 border rounded" required />
          <input type="text" placeholder="Ubicación" value={eventData.location} onChange={(e) => setEventData({ ...eventData, location: e.target.value })} className="w-full p-2 border rounded" required />
          <textarea placeholder="Descripción" value={eventData.description} onChange={(e) => setEventData({ ...eventData, description: e.target.value })} className="w-full p-2 border rounded" rows="4"></textarea>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">{eventData._id ? "Guardar Cambios" : "Crear Evento"}</button>
        </form>
      </div>

      <div className="bg-white p-6 shadow-md rounded-lg mb-6">
        <h2 className="text-xl font-semibold text-blue-600 mb-4">Filtrar Eventos</h2>
        <div className="flex gap-4">
          <input type="date" value={filters.date} onChange={(e) => setFilters({ ...filters, date: e.target.value })} className="w-full p-2 border rounded" />
          <input type="text" placeholder="Ubicación" value={filters.location} onChange={(e) => setFilters({ ...filters, location: e.target.value })} className="w-full p-2 border rounded" />
          <button onClick={handleFilter} className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">Filtrar</button>
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-blue-600 mb-4">Lista de Eventos</h2>
      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event._id} className="bg-white p-4 shadow-md rounded-lg flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold">{event.name}</h3>
              <p className="text-gray-600">{event.date} - {event.time}</p>
              <p className="text-gray-600">Ubicación: {event.location}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(event)} className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600">Editar</button>
              <button onClick={() => handleDelete(event._id)} className="bg-red-600 text-white p-2 rounded hover:bg-red-700">Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventPage;
