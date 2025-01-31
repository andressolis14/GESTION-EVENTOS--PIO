const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true, // Esto añade los campos `createdAt` y `updatedAt`
  }
);

// Añadir índices para optimizar la búsqueda
eventSchema.index({ date: 1 }); // Index por fecha (ascendente)
eventSchema.index({ location: "text" }); // Index de texto para búsqueda por ubicación

module.exports = mongoose.model("Event", eventSchema);
