const {
  obtenerCitas,
  obtenerCitaPorId,
  crearCita,
  actualizarCita,
  eliminarCita,
  obtenerCitasDelDiaService,
  obtenerCitasFiltradasService,
} = require("./citas.service");

async function obtenerCitasController(req, res) {
  try {
    const citas = await obtenerCitas();
    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las citas" });
  }
}

async function obtenerCitasPorIdController(req, res) {
  try {
    const { id } = req.params;
    const cita = await obtenerCitaPorId(id);

    if (cita.error) {
      const { codigo, mensaje, estado } = cita.error;
      const mensajeError = {
        error: {
          codigo: codigo,
          mensaje: mensaje,
        },
      };

      if (["001", "002"].includes(codigo)) {
        return res.status(estado).json(mensajeError);
      }

      console.error(`Error inesperado obteniendo cita:`, cita.error);
      return res.status(500).json({
        error: {
          codigo: 500,
          mensaje: "Error de servidor",
        },
      });
    }

    res.status(200).json(cita);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener la cita" });
  }
}

async function crearCitaController(req, res) {
  try {
    const { idPaciente, idMedico, estado, fecha, hora } = req.body;
    const cita = await crearCita(idPaciente, idMedico, estado, fecha, hora);

    if (cita.error) {
      const { codigo, mensaje, estado } = cita.error;
      const mensajeError = {
        error: {
          codigo: codigo,
          mensaje: mensaje,
        },
      };

      if (["001", "002"].includes(codigo)) {
        return res.status(estado).json(mensajeError);
      }

      console.error(`Error inesperado creando cita:`, cita.error);
      return res.status(500).json({
        error: {
          codigo: 500,
          mensaje: "Error de servidor",
        },
      });
    }

    res.status(201).json(cita);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la cita" });
  }
}

async function actualizarCitaController(req, res) {
  try {
    const { id } = req.params;
    const { idPaciente, idMedico, estado, fecha, hora } = req.body;
    const cita = await actualizarCita(
      idPaciente,
      idMedico,
      estado,
      fecha,
      hora,
      id,
    );

    if (cita.error) {
      const { codigo, mensaje, estado } = cita.error;
      const mensajeError = {
        error: {
          codigo: codigo,
          mensaje: mensaje,
        },
      };

      if (["001", "002"].includes(codigo)) {
        return res.status(estado).json(mensajeError);
      }

      console.error(`Error inesperado actualizando cita:`, cita.error);
      return res.status(500).json({
        error: {
          codigo: 500,
          mensaje: "Error de servidor",
        },
      });
    }

    res.status(200).json(cita);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar la cita" });
  }
}

async function eliminarCitaController(req, res) {
  try {
    const { id } = req.params;
    const cita = await eliminarCita(id);

    if (cita.error) {
      const { codigo, mensaje, estado } = cita.error;
      const mensajeError = {
        error: {
          codigo: codigo,
          mensaje: mensaje,
        },
      };

      if (["001", "002"].includes(codigo)) {
        return res.status(estado).json(mensajeError);
      }

      console.error(`Error inesperado eliminando cita:`, cita.error);
      return res.status(500).json({
        error: {
          codigo: 500,
          mensaje: "Error de servidor",
        },
      });
    }
    res.status(200).json({ mensaje: "cita eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la cita" });
  }
}

async function obtenerCitasDelDiaController(req, res) {
  try {
    const data = await obtenerCitasDelDiaService();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener citas del día" });
  }
}

async function obtenerCitasFiltradasController(req, res) {
  try {
    const { dni, fecha, estado } = req.query;

    const citas = await obtenerCitasFiltradasService({
      dni,
      fecha,
      estado,
    });

    if (citas.length === 0) {
      return res.status(200).json([]);
    }

    res.json(citas);
  } catch (error) {
    console.error("Error en getCitasFiltradas:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
}

module.exports = {
  obtenerCitasController: obtenerCitasController,
  obtenerCitasPorIdController: obtenerCitasPorIdController,
  crearCitaController: crearCitaController,
  actualizarCitaController: actualizarCitaController,
  eliminarCitaController: eliminarCitaController,
  obtenerCitasDelDiaController: obtenerCitasDelDiaController,
  obtenerCitasFiltradasController: obtenerCitasFiltradasController,
};
