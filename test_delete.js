require("dotenv").config({ path: "./backend/.env" });
const db = require("./backend/database/conexion");

async function testDelete() {
    try {
        const id = 3;
        console.log(`Intentando eliminar paciente con ID: ${id}`);
        const res = await db.query("DELETE FROM paciente WHERE id_paciente = $1 RETURNING *", [id]);
        console.log("Resultado:", res.rows);
    } catch (error) {
        console.error("Error capturado:", error.message);
        console.error("Detalle:", error);
    } finally {
        process.exit();
    }
}

testDelete();
