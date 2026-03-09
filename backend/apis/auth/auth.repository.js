const db = require("../../database/conexion");

async function findByUsuario(usuario) {
    // Aquí iría tu consulta SQL: SELECT * FROM usuarios WHERE usuario = ?
    // Por ahora simulamos una respuesta:
    console.log("Buscando al usuario:", usuario);
    if (usuario === "admin") {
      return { id: 1, usuario: "admin", clave: "1234" }; // La clave debería estar encriptada
    }
    return null;
  }

module.exports = {
    findByUsuario: findByUsuario,
}