const db = require("../../database/conexion");

async function obtenerCitasRepository() {
    const resultadoDeConsulta = await db.query("SELECT * FROM cita");

    return resultadoDeConsulta.rows
}

async function obtenerCitaPorIdRepository(id) {
    const resultadoDeConsulta = await db.query(
        "SELECT * FROM cita WHERE id_cita = $1",
        [id]
    );

    return resultadoDeConsulta.rows;
}

async function crearCitaRepository(idPaciente, idMedico, estado, fecha, hora) {
    const resultadoDeConsulta = await db.query(
        "INSERT INTO cita (id_paciente, id_medico, estado, fecha, hora) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [idPaciente, idMedico, estado, fecha, hora]
    );

    return resultadoDeConsulta.rows;
}

async function actualizarCitaRepository(idPaciente, idMedico, estado, fecha, hora, id) {
    const resultadoDeConsulta = await db.query(
        "UPDATE cita SET id_paciente = $1, id_medico = $2, estado = $3, fecha = $4, hora = $5 WHERE id_cita = $6 RETURNING *",
        [idPaciente, idMedico, estado, fecha, hora, id]
    );

    return resultadoDeConsulta.rows;
}

async function eliminarCitaRepository(id) {
    const resultadoDeConsulta = await db.query(
        "DELETE FROM cita WHERE id_cita = $1 RETURNING *",
        [id]
    );

    return resultadoDeConsulta.rows;
}

module.exports = {
    obtenerCitasRepository: obtenerCitasRepository,
    obtenerCitaPorIdRepository: obtenerCitaPorIdRepository,
    crearCitaRepository: crearCitaRepository,
    actualizarCitaRepository: actualizarCitaRepository,
    eliminarCitaRepository: eliminarCitaRepository,
};