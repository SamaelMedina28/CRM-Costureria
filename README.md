# 🔐 Sistema de Autenticación Express + MongoDB

Este proyecto es un sistema de autenticación robusto desarrollado con **Node.js**, **Express**, **TypeScript** y **MongoDB**. Implementa el manejo de sesiones mediante **JWT (JSON Web Tokens)** almacenados en cookies seguras, validación de datos y hashing de contraseñas.

---

## 🚀 Tecnologías Utilizadas

- **Backend:** [Node.js](https://nodejs.org/) & [Express.js](https://expressjs.com/)
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/)
- **Base de Datos:** [MongoDB](https://www.mongodb.com/) (vía [Mongoose](https://mongoosejs.com/))
- **Autenticación:** [JWT (jsonwebtoken)](https://github.com/auth0/node-jsonwebtoken) & [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **Validación:** [Express-Validator](https://express-validator.github.io/docs/)
- **Contenedores:** [Docker](https://www.docker.com/) (para la base de datos)
- **Herramientas de Desarrollo:** [tsx](https://github.com/privatenumber/tsx), [dotenv](https://github.com/motdotla/dotenv)

---

## 🛠️ Requisitos Previos

- [Node.js](https://nodejs.org/) (v18 o superior recomendado)
- [Docker](https://www.docker.com/) y [Docker Compose](https://docs.docker.com/compose/)
- Un cliente HTTP (Postman, Insomnia o REST Client de VS Code)

---

## ⚙️ Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd crud-con-mongo
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   Crea un archivo `.env` en la raíz del proyecto y define las siguientes variables (puedes basarte en el archivo `.env.example` si existe o usar los valores por defecto):
   ```env
   PORT=3000
   JWT_SECRET=tu_secreto_super_seguro
   MONGO_USERNAME=admin
   MONGO_PASSWORD=admin_password
   MONGO_DATABASE=crud_mongo
   MONGO_URI=mongodb://admin:admin_password@localhost:27017/crud_mongo?authSource=admin
   ```

4. **Levantar la base de datos (Docker):**
   ```bash
   docker-compose up -d
   ```

---

## 🏃 Ejecución

### Modo Desarrollo
Para iniciar el servidor con recarga automática:
```bash
npm run dev
```

### Modo Producción
Compilar e iniciar el servidor:
```bash
npm run build
npm start
```

El servidor estará escuchando en: `http://localhost:3000`

---

## 🛣️ Endpoints de la API

| Método | Endpoint | Descripción | Acceso |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Registra un nuevo usuario | Público |
| `POST` | `/login` | Inicia sesión y genera el token | Público |
| `POST` | `/logout` | Cierra la sesión (elimina la cookie) | Público |
| `GET` | `/profile` | Obtiene el perfil del usuario autenticado | Protegido |

### Ejemplos de uso:

#### Registro de Usuario
**URL:** `POST /register`
**Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

#### Login
**URL:** `POST /login`
**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

---

## 🔒 Seguridad Implementada

- **Hasing de Contraséñas:** Se utiliza `bcrypt` para encriptar las contraseñas antes de guardarlas en la base de datos.
- **Tokens Seguros:** Los JWT se configuran con una expiración y se envían al cliente mediante cookies `httpOnly` para mitigar ataques XSS.
- **Validación de Datos:** Todos los inputs son saneados y validados mediante middlewares especializados antes de llegar a los controladores.
- **Protección de Rutas:** Middleware `isAuth` que verifica la validez del token en cada petición protegida.

---

## 📁 Estructura del Proyecto

```text
src/
├── config/         # Configuración de DB y variables
├── controllers/    # Lógica de los endpoints
├── middlewares/    # Middlewares de validación y auth
├── models/         # Esquemas de Mongoose (User)
├── routes/         # Definición de rutas
├── validations/    # Reglas de validación (Express-Validator)
├── index.ts        # Punto de entrada de la aplicación
└── ...
```

---

Desarrollado con ❤️ por el equipo de desarrollo.
