const db = require("../../database/conexion");

async function findByUsuario(usuario) {
  const query = "SELECT * FROM Usuario WHERE Usuario = $1";
  const res = await db.query(query, [usuario]);

  if (res.rows.length > 0) {
    const u = res.rows[0];
    return {
      id: u.id_usuario,
      usuario: u.usuario,
      clave: u.clave,
    };
  }
  return null;
}

async function crearUsuario(usuario, claveEncriptada, rol = "Admin") {
  const query =
    "INSERT INTO Usuario (Usuario, Clave, Rol) VALUES ($1, $2, $3) RETURNING id_usuario";
  const res = await db.query(query, [usuario, claveEncriptada, rol]);
  return res.rows[0];
}

module.exports = {
  findByUsuario: findByUsuario,
  crearUsuario:crearUsuario,
};
