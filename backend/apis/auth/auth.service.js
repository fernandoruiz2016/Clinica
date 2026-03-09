const jwt = require("jsonwebtoken");
const { findByUsuario } = require("./auth.repository");

async function login(usuario, clave) {
  try {
    const user = await findByUsuario(usuario);

    // 1. Verificación de usuario
    if (!user || String(user.clave).trim() !== String(clave).trim()) {
      throw new Error("Credenciales inválidas");
    }

    // 2. Generación del Token con "Plan B" si el .env falla
    const secreto = process.env.CLAVE_TOKEN || "IDAT_SECRET_2026";

    // Usamos la versión sincrónica para evitar que se quede colgado
    const token = jwt.sign({ id: user.id, usuario: user.usuario }, secreto, {
      expiresIn: "8h",
    });

    console.log("¡Token generado con éxito!");
    return { token };
  } catch (error) {
    console.error("Error dentro de auth.service:", error.message);
    throw error; // Lanza el error para que el controlador lo atrape
  }
}

module.exports = {
  login: login,
};
