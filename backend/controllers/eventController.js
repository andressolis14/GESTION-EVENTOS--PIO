const Event = require("../models/Event");

// Obtener eventos con filtros (fecha o ubicación)
const getEvents = async (req, res) => {
  try {
    const { date, location } = req.query;
    const filter = {};

    if (date) filter.date = date;
    if (location) filter.location = { $regex: location, $options: "i" };

    const events = await Event.find(filter);
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener eventos" });
  }
};

// Crear un evento
const createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: "Error al crear evento" });
  }
};

// Actualizar un evento
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar evento" });
  }
};

// Eliminar un evento
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    await Event.findByIdAndDelete(id);
    res.json({ message: "Evento eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar evento" });
  }
};

module.exports = {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
};
