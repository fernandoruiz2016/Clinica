const express = require("express");
const router = express.Router();
const {validarCita} = require("../../middleware/citas/validacion")
const { obtenerCitasController, obtenerCitasPorIdController, crearCitaController,actualizarCitaController, eliminarCitaController } = require("./citas.controller")

// Obtener todos los citas
router.get("/", obtenerCitasController);

// Obtener un cita por ID
router.get("/:id", obtenerCitasPorIdController);

// Crear un nuevo cita
router.post("/", validarCita, crearCitaController);

// Actualizar un cita
router.put("/:id", validarCita, actualizarCitaController);

// Eliminar un cita
router.delete("/:id", eliminarCitaController);

module.exports = router;
