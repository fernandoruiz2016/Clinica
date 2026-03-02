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

async function obtenerCitasDelDia() {
  const result = await db.query(`
    SELECT 
    c.id_cita,
    TO_CHAR(c.fecha, 'YYYY-MM-DD') AS fecha,
    c.hora,
    c.estado,
    p.nombre AS paciente,
    m.nombre AS medico,
    e.nombre AS especialidad
    FROM cita c
    JOIN paciente p ON c.id_paciente = p.id_paciente
    JOIN medico m ON c.id_medico = m.id_medico
    JOIN especialidad e ON m.id_especialidad = e.id_especialidad
    WHERE DATE(c.fecha) = CURRENT_DATE
    ORDER BY c.hora ASC;
  `);

  return result.rows;
}

async function obtenerCitasFiltradas(filtros = {}) {
  const { dni, fecha, estado, paciente, medico, especialidad, pago } = filtros;

  let query = `
    SELECT 
      c.Id_Cita,
      p.DNI AS dni,
      (p.Nombre || ' ' || p.Apellido) AS paciente,
      TO_CHAR(c.Fecha, 'YYYY-MM-DD') AS fecha,
      c.Hora,
      (m.Nombre || ' ' || m.Apellido) AS medico,
      e.Nombre AS especialidad,
      c.Estado,
      pg.Monto
    FROM Cita c
    JOIN Paciente p ON c.Id_Paciente = p.Id_Paciente
    JOIN Medico m ON c.Id_Medico = m.id_medico
    JOIN Especialidad e ON m.Id_Especialidad = e.Id_Especialidad
    LEFT JOIN Pago pg ON c.Id_Cita = pg.Id_Cita
    WHERE 1=1
  `;

  const values = [];
  let count = 1;

  // Filtros originales (exactos)
  if (fecha) {
    query += ` AND c.Fecha = $${count++}`;
    values.push(fecha);
  }

  if (estado) {
    query += ` AND c.Estado = $${count++}`;
    values.push(estado);
  }

  if (dni) {
    query += ` AND p.DNI LIKE $${count++}`;
    values.push(`${dni}%`);
  }

  if (paciente) {
    query += ` AND (p.Nombre || ' ' || p.Apellido) ILIKE $${count++}`;
    values.push(`%${paciente}%`);
  }

  if (medico) {
    query += ` AND (m.Nombre || ' ' || m.Apellido) ILIKE $${count++}`;
    values.push(`%${medico}%`);
  }

  if (especialidad) {
    query += ` AND e.Nombre ILIKE $${count++}`;
    values.push(`%${especialidad}%`);
  }

  // Lógica de pago
  if (pago === 'pagado') {
    query += ` AND pg.Monto IS NOT NULL`;
  } else if (pago === 'pendiente') {
    query += ` AND pg.Monto IS NULL`;
  }

  query += ` ORDER BY c.Fecha DESC, c.Hora ASC;`;

  const result = await db.query(query, values);
  return result.rows;
}


module.exports = {
  obtenerCitasRepository: obtenerCitasRepository,
  obtenerCitaPorIdRepository: obtenerCitaPorIdRepository,
  crearCitaRepository: crearCitaRepository,
  actualizarCitaRepository: actualizarCitaRepository,
  eliminarCitaRepository: eliminarCitaRepository,
  obtenerCitasDelDia: obtenerCitasDelDia,
  obtenerCitasFiltradas: obtenerCitasFiltradas,
};