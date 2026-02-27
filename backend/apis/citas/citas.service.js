const { obtenerCitasRepository, obtenerCitaPorIdRepository, crearCitaRepository, actualizarCitaRepository, eliminarCitaRepository, obtenerCitasDelDia, obtenerCitasFiltradas } = require("./citas.repository")

async function obtenerCitas() {
    return await obtenerCitasRepository();
}

async function obtenerCitaPorId(id) {
    const cita = await obtenerCitaPorIdRepository(id);

    if (cita.length === 0) {
        return {
            error: {
                code: "001",
                mensaje: "Elemento no encontrado",
                estado: 404,
            },
        };
    }

    return cita[0];
}

async function crearCita(idPaciente, idMedico, estado, fecha, hora) {
    const cita = await crearCitaRepository(idPaciente, idMedico, estado, fecha, hora);

    if (cita.length === 0) {
        return {
            error: {
                code: "002",
                mensaje: "No se pudo crear el cita",
                estado: 500,
            },
        };
    }

    return cita[0];
}

async function actualizarCita(idPaciente, idMedico, estado, fecha, hora, id) {
    const cita = await actualizarCitaRepository(idPaciente, idMedico, estado, fecha, hora, id);

    if (cita.length === 0) {
        return {
            error: {
                code: "001",
                mensaje: "Elemento no encontrado",
                estado: 404,
            },
        };
    }

    return cita[0];
}

async function eliminarCita(id) {
    const cita = await eliminarCitaRepository(id);

    if (cita.length === 0) {
        return {
            error: {
                code: "001",
                mensaje: "Elemento no encontrado",
                estado: 404,
            },
        };
    }

    return cita[0];
}

async function obtenerCitasDelDiaService() {
  return await obtenerCitasDelDia();
}

async function obtenerCitasFiltradasService(filtros) {
  return await obtenerCitasFiltradas(filtros);
}

module.exports = {
  obtenerCitas: obtenerCitas,
  obtenerCitaPorId: obtenerCitaPorId,
  crearCita: crearCita,
  actualizarCita: actualizarCita,
  eliminarCita: eliminarCita,
  obtenerCitasDelDiaService: obtenerCitasDelDiaService,
  obtenerCitasFiltradasService: obtenerCitasFiltradasService,
};