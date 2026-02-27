const { obtenerPacientes, obtenerPacientePorId, crearPaciente, actualizarPaciente, eliminarPaciente } = require("./pacientes.service");

async function obtenerPacientesController(req, res) {
  try {
    const pacientes = await obtenerPacientes();
    res.status(200).json(pacientes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los pacientes" });
  }
}

async function obtenerPacientesPorIdController(req, res) {
  try {
    const { id } = req.params;
    const paciente = await obtenerPacientePorId(id);

    if (paciente.error) {
      const { codigo, mensaje, estado } = paciente.error;
      const mensajeError = {
        error: {
          codigo: codigo,
          mensaje: mensaje,
        },
      };

      if (["001", "002"].includes(codigo)) {
        return res.status(estado).json(mensajeError);
      }

      console.error(`Error inesperado obteniendo paciente:`, paciente.error);
      return res.status(500).json({
        error: {
          codigo: 500,
          mensaje: "Error de servidor",
        },
      });
    }

    res.status(200).json(paciente);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el paciente" });
  }
}

async function crearPacienteController(req, res) {
  try {
    const { apellido, nombre, dni, telefono } = req.body;
    const paciente = await crearPaciente(apellido, nombre, dni, telefono);

    if (paciente.error) {
      const { codigo, mensaje, estado } = paciente.error;
      const mensajeError = {
        error: {
          codigo: codigo,
          mensaje: mensaje,
        },
      };

      if (["001", "002"].includes(codigo)) {
        return res.status(estado).json(mensajeError);
      }

      console.error(`Error inesperado creando paciente:`, paciente.error);
      return res.status(500).json({
        error: {
          codigo: 500,
          mensaje: "Error de servidor",
        },
      });
    }

    res.status(201).json(paciente);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el paciente" });
  }
}

async function actualizarPacienteController(req, res) {
    try {
      const { id } = req.params;
      const { apellido, nombre, dni, telefono } = req.body;
      const paciente = await actualizarPaciente(apellido, nombre, dni, telefono, id)
      
      if (paciente.error) {
        const { codigo, mensaje, estado } = paciente.error;
        const mensajeError = {
          error: {
            codigo: codigo,
            mensaje: mensaje,
          },
        };

        if (["001", "002"].includes(codigo)) {
          return res.status(estado).json(mensajeError);
        }

        console.error(`Error inesperado actualizando paciente:`, paciente.error);
        return res.status(500).json({
          error: {
            codigo: 500,
            mensaje: "Error de servidor",
          },
        });
      }

      res.status(200).json(paciente);
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar el paciente" });
    }
}

async function eliminarPacienteController(req, res) {
  try {
    const { id } = req.params;
    const paciente = await eliminarPaciente(id);

    if (paciente.error) {
      const { codigo, mensaje, estado } = paciente.error;
      const mensajeError = {
        error: {
          codigo: codigo,
          mensaje: mensaje,
        },
      };

      if (["001", "002"].includes(codigo)) {
        return res.status(estado).json(mensajeError);
      }

      console.error(`Error inesperado eliminando paciente:`, paciente.error);
      return res.status(500).json({
        error: {
          codigo: 500,
          mensaje: "Error de servidor",
        },
      });
    }
    res.status(200).json({ mensaje: "paciente eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el paciente" });
  }
}

module.exports = {
  obtenerPacientesController: obtenerPacientesController,
  obtenerPacientesPorIdController: obtenerPacientesPorIdController,
  crearPacienteController: crearPacienteController,
  actualizarPacienteController: actualizarPacienteController,
  eliminarPacienteController: eliminarPacienteController,
};
