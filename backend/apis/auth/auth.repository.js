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

module.exports = {
    findByUsuario: findByUsuario,
}