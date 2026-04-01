const db = require("../../database/conexion");

async function obtenerMedicosRepository() {
    const resultadoDeConsulta = await db.query(`
        SELECT 
            m.id_medico,
            m.nombre,
            m.apellido,
            m.dni,
            m.telefono,
            e.nombre AS especialidad
        FROM medico m
        LEFT JOIN especialidad e 
            ON m.id_especialidad = e.id_especialidad
    `);

    return resultadoDeConsulta.rows;
}

async function obtenerMedicoPorIdRepository(id) {
    const resultadoDeConsulta = await db.query(
        "SELECT * FROM medico WHERE id_medico = $1",
        [id]
    );

    return resultadoDeConsulta.rows;
}

async function crearMedicoRepository(apellido, nombre, dni, telefono, idEspecialidad) {
    const resultadoDeConsulta = await db.query(
        "INSERT INTO medico (apellido, nombre, dni, telefono, id_especialidad) VALUES ($1, $2, $3, $4, $5) RETURNING *",
        [apellido, nombre, dni, telefono, idEspecialidad]
    );

    return resultadoDeConsulta.rows;
}

async function actualizarMedicoRepository(apellido, nombre, dni, telefono, idEspecialidad, id) {
    const resultadoDeConsulta = await db.query(
        "UPDATE medico SET apellido = $1, nombre = $2, dni = $3, telefono = $4, id_especialidad = $5 WHERE id_medico = $6 RETURNING *",
        [apellido, nombre, dni, telefono, idEspecialidad, id]
    );

    return resultadoDeConsulta.rows;
}

async function eliminarMedicoRepository(id) {
    const resultadoDeConsulta = await db.query(
        "DELETE FROM medico WHERE id_medico = $1 RETURNING *",
        [id]
    );

    return resultadoDeConsulta.rows;
}

// ✅ ESTA FUNCIÓN SÍ EXISTE (la agregamos)
async function obtenerEspecialidadesRepository() {
    const resultadoDeConsulta = await db.query(
        "SELECT * FROM especialidad"
    );

    return resultadoDeConsulta.rows;
}

module.exports = {
    obtenerMedicosRepository,
    obtenerMedicoPorIdRepository,
    crearMedicoRepository,
    actualizarMedicoRepository,
    eliminarMedicoRepository,
    obtenerEspecialidadesRepository
};