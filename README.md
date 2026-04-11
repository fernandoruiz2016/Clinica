# Sistema de Gestión Clínica

Un sistema integral "Full-Stack" para la gestión de pacientes, médicos, citas y reportes de una clínica. El proyecto está dividido en un Frontend desarrollado con Angular y un Backend construido en Node.js con Express y PostgreSQL.

## Estructura del Proyecto

El repositorio está compuesto por dos directorios principales:

- **`/frontend`**: Aplicación web SPA (Single Page Application).
- **`/backend`**: API RESTful que proporciona la lógica de negocio y acceso a datos.

---

## Tecnologías Utilizadas

### Frontend
- **Framework:** Angular 21
- **Estilos y Componentes:** Bootstrap 5, Bootstrap Icons
- **Gráficos:** Chart.js, ng2-charts
- **Otros:** RxJS para programación reactiva.

### Backend
- **Entorno de ejecución:** Node.js
- **Framework Web:** Express
- **Base de Datos:** PostgreSQL (paquete `pg`)
- **Seguridad:** JWT (JSON Web Tokens) para autenticación, `bcryptjs` para encriptado de contraseñas.
- **Variables de entorno:** `dotenv`
- **CORS:** Manejado con el middleware `cors`

---

## Características Principales

- **Gestión de Usuarios (Médicos/Pacientes):** Operaciones CRUD completas (Crear, Leer, Actualizar, Eliminar).
- **Control de Citas/Reportes:** Generación de reportes y visualización de datos de citas con gráficos.
- **Autenticación Segura:** Sistema de login utilizando JWT, con contraseñas encriptadas en la base de datos y validación de tokens en los endpoints.
- **Validaciones:** Formularios reactivos en Angular con validaciones rigurosas y manejo de errores globales en el frontend usando `HttpInterceptor`.
- **Diseño Responsivo:** Interfaz gráfica estéticamente agradable y responsiva utilizando Bootstrap y CSS personalizado.

---

## Instalación y Ejecución

Es necesario tener instalado [Node.js](https://nodejs.org/), Angular CLI y PostgreSQL en tu máquina local.

### 1. Configuración del Backend

1. Navega al directorio del backend:
   ```bash
   cd backend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno:
   Crea el archivo `.env` en la raíz del directorio `backend` con las credenciales de tu base de datos y la clave del JWT.
   ```env
   DB_USER=tu_usuario
   DB_PASSWORD=tu_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_DATABASE=clinica_db
   JWT_SECRET=tu_secreto_super_seguro
   PORT=3000
   ```
4. Inicia el servidor backend:
   ```bash
   node index.js
   ```

### 2. Configuración del Frontend

1. Abre una nueva terminal y navega al directorio del frontend:
   ```bash
   cd frontend
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo de Angular:
   ```bash
   ng serve
   ```
4. Abre tu navegador y dirígete a `http://localhost:4200/`.

