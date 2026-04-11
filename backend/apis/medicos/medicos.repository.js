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

// ✅ FUNCIÓN DE FILTRADO
async function obtenerMedicosFiltradosRepository(filtros = {}) {
    const { dni, nombre, apellido, telefono, idEspecialidad } = filtros;
    let query = `
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
        WHERE 1=1
    `;
    const values = [];
    let count = 1;

    if (dni) {
        query += ` AND m.dni LIKE $${count++}`;
        values.push(`${dni}%`);
    }
    if (nombre) {
        query += ` AND m.nombre ILIKE $${count++}`;
        values.push(`%${nombre}%`);
    }
    if (apellido) {
        query += ` AND m.apellido ILIKE $${count++}`;
        values.push(`%${apellido}%`);
    }
    if (telefono) {
        query += ` AND m.telefono LIKE $${count++}`;
        values.push(`%${telefono}%`);
    }
    if (idEspecialidad && idEspecialidad !== 'null' && idEspecialidad !== '') {
        query += ` AND m.id_especialidad = $${count++}`;
        values.push(idEspecialidad);
    }

    query += " ORDER BY m.apellido ASC, m.nombre ASC";
    const resultadoDeConsulta = await db.query(query, values);
    return resultadoDeConsulta.rows;
}

module.exports = {
    obtenerMedicosRepository,
    obtenerMedicoPorIdRepository,
    crearMedicoRepository,
    actualizarMedicoRepository,
    eliminarMedicoRepository,
    obtenerEspecialidadesRepository,
    obtenerMedicosFiltradosRepository
};