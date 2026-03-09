const { login } = require("./auth.service");

async function loginController(req, res) {
  try {
    const { usuario, clave } = req.body;
    const result = await login(usuario, clave);
    return res.status(200).json(result);
  } catch (error) {
    // ESTA LÍNEA ES CLAVE: Mira tu terminal de VS Code / Node
    console.error("ERROR EN LOGIN:", error.message);

    return res.status(401).json({ message: error.message });
  }
}

module.exports = {
  loginController: loginController,
};
