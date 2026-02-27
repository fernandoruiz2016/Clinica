const express = require("express");
const cors = require("cors");
require("dotenv").config({quiet:true});

const crearTablas = require("./database/crearTablas");

const pacientesApi = require("./apis/pacientes");
const medicosApi = require("./apis/medicos");
const citasApi = require("./apis/citas");
const dashboardRoutes = require("./apis/dashboard");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/pacientes", pacientesApi);
app.use("/medicos", medicosApi);
app.use("/citas", citasApi);
app.use("/dashboard", dashboardRoutes);

const port = process.env.SERVER_PORT;

app.listen(port, () => {
  crearTablas();
  console.log(`Servidor escuchando en el puerto ${port}`);
});
