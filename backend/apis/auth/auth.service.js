const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { findByUsuario } = require("./auth.repository");

async function login(usuario, clave) {
  try {
    const user = await findByUsuario(usuario);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    const isMatch = await bcrypt.compare(
      String(clave).trim(),
      user.clave.trim(),
    );

    if (!isMatch) {
      throw new Error("Credenciales inválidas");
    }

    const token = jwt.sign(
      { id: user.id, usuario: user.usuario },
      process.env.CLAVE_TOKEN || "IDAT_SECRET_2026",
      { expiresIn: "8h" },
    );

    return { token };
  } catch (error) {
    console.error("Error dentro de auth.service:", error.message);
    throw error;
  }
}

module.exports = {
  login: login,
};
