const db = require("./conexion");

const sql = `
CREATE TABLE IF NOT EXISTS Paciente (
    Id_Paciente SERIAL PRIMARY KEY,
    Apellido VARCHAR(50) NOT NULL,
    Nombre VARCHAR(50) NOT NULL,
    DNI char(8) NOT NULL UNIQUE,
    Telefono varchar(15) NOT NULL
);

CREATE TABLE IF NOT EXISTS Especialidad (
    Id_Especialidad SERIAL PRIMARY KEY,
    Nombre VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Medico (
    Id_Medico SERIAL PRIMARY KEY,
    Apellido VARCHAR(50) NOT NULL,
    Nombre VARCHAR(50) NOT NULL,
    DNI char(8) NOT NULL,
    Telefono varchar(15) NOT NULL,
    Id_Especialidad INTEGER REFERENCES Especialidad(Id_Especialidad)
);

CREATE TABLE IF NOT EXISTS Cita (
    Id_Cita SERIAL PRIMARY KEY,
    Id_Paciente INTEGER NOT NULL,
    Id_Medico INTEGER NOT NULL,
    Estado varchar(15) NOT NULL CHECK (Estado IN ('Programada','Atendida','Cancelada','No asistio')),
    Fecha DATE NOT NULL,
    Hora time NOT NULL,

    CONSTRAINT fk_paciente
    FOREIGN KEY (Id_Paciente)
    REFERENCES Paciente (Id_Paciente)
    ON DELETE CASCADE,

    CONSTRAINT fk_medico
    FOREIGN KEY (Id_Medico)
    REFERENCES Medico (Id_Medico)
    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS Pago (
    Id_Pago SERIAL PRIMARY KEY,
    Id_Cita INTEGER NOT NULL UNIQUE, -- UNIQUE garantiza que una cita no se pague dos veces
    Monto DECIMAL(10, 2) NOT NULL CHECK (Monto >= 0),
    Fecha_Pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Metodo_Pago VARCHAR(20) NOT NULL CHECK (Metodo_Pago IN ('Efectivo', 'Tarjeta', 'Transferencia')),
    
    CONSTRAINT fk_cita_pago
    FOREIGN KEY (Id_Cita)
    REFERENCES Cita (Id_Cita)
    ON DELETE CASCADE
);


INSERT INTO Especialidad (Nombre) VALUES 
('Medicina General'), 
('Pediatría'), 
('Cardiología'), 
('Dermatología'), 
('Ginecología');

-- 2. Insertar Pacientes
INSERT INTO Paciente (Apellido, Nombre, DNI, Telefono) VALUES 
('García', 'Juan', '12345678', '987654321'),
('Rodríguez', 'María', '87654321', '912345678'),
('López', 'Carlos', '45678912', '933445566');

-- 3. Insertar Médicos (Asociados a especialidad)
INSERT INTO Medico (Apellido, Nombre, DNI, Telefono, Id_Especialidad) VALUES 
('Pérez', 'Luis', '11223344', '955667788', 1),
('Sánchez', 'Ana', '44332211', '944556677', 2),
('Torres', 'Elena', '55667788', '922110033', 3);

-- 4. Insertar Citas (Diferentes estados)
INSERT INTO Cita (Id_Paciente, Id_Medico, Estado, Fecha, Hora) VALUES 
(1, 1, 'Atendida', '2026-03-01', '10:00:00'), -- Cita de ayer
(2, 2, 'Programada', '2026-03-05', '15:30:00'), -- Cita futura
(3, 3, 'Atendida', '2026-03-02', '09:00:00'), -- Cita de hoy
(1, 2, 'Cancelada', '2026-03-10', '11:00:00');

-- 5. Insertar Pagos (Asociados a las citas 'Atendida')
-- Solo pagaremos la cita 1 y la cita 3
INSERT INTO Pago (Id_Cita, Monto, Metodo_Pago) VALUES 
(1, 50.00, 'Efectivo'),
(3, 75.50, 'Tarjeta');
`;

function crearTablas() {
  return db
    .query(sql)
    .then(() => {
      console.log("Tablas creadas correctamente");
    })
    .catch((err) => {
      console.error("Error creando las tablas:", err);
      throw err;
    });
}

module.exports = crearTablas;
