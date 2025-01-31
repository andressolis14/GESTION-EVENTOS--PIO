const express = require("express");
const Event = require("../models/Event");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Crear evento
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, date, time, location, description } = req.body;
    const event = new Event({
      name,
      date,
      time,
      location,
      description,
      user: req.user.id,
    });
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: "Error al crear evento" });
  }
});

// Obtener eventos con filtros de fecha o ubicación
router.get("/", authMiddleware, async (req, res) => {
  try {
    const { date, location } = req.query;
    const filter = { user: req.user.id };

    if (date) {
      filter.date = date; // Filtra por fecha
    }

    if (location) {
      filter.location = { $regex: location, $options: "i" }; // Filtra por ubicación (insensible a mayúsculas/minúsculas)
    }

    const events = await Event.find(filter);
    res.json(events);
  } catch (err) {
    res.status(400).json({ error: "Error al obtener eventos" });
  }
});

// Actualizar evento
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, date, time, location, description } = req.body;
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { name, date, time, location, description },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    res.json(updatedEvent);
  } catch (err) {
    res.status(400).json({ error: "Error al actualizar evento" });
  }
});

// Eliminar evento
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);

    if (!deletedEvent) {
      return res.status(404).json({ error: "Evento no encontrado" });
    }

    res.json({ message: "Evento eliminado" });
  } catch (err) {
    res.status(400).json({ error: "Error al eliminar evento" });
  }
});

module.exports = router;
