# Sistema de Gestión de Eventos

Este es un sistema para gestionar eventos, que permite a los usuarios registrar, editar, eliminar y filtrar eventos. Además, cuenta con un sistema de autenticación para el acceso.

## Requisitos

Antes de comenzar, asegúrate de tener instalados los siguientes requisitos:

- [Node.js](https://nodejs.org/en/) (Versión recomendada: 16.x o superior)
- [MongoDB](https://www.mongodb.com/) (Instalado localmente o usar MongoDB Atlas)
- [React.js](https://reactjs.org/) (Frontend)
- [Tailwind CSS](https://tailwindcss.com/) (Estilos)

## Instalación

### Backend (Servidor)

1. Clona el repositorio del proyecto:

   ```bash
   git clone https://github.com/andressolis14/GESTION-EVENTOS--PIO.git
   cd gestion-eventos
   ```

2. Accede a la carpeta del backend:

   ```bash
   cd backend
   ```

3. Instala las dependencias del backend:

   ```bash
   npm install
   ```

4. Crea un archivo `.env` en la carpeta raíz del backend y agrega las siguientes variables de entorno:

   ```bash
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/gestion-eventos
   JWT_SECRET=your_secret_key
   ```

5. Inicia el servidor:

   ```bash
   npm start
   ```

   El backend estará corriendo en `http://localhost:5000`.

### Frontend (Interfaz de usuario)

1. Accede a la carpeta del frontend:

   ```bash
   cd frontend
   ```

2. Instala las dependencias del frontend:

   ```bash
   npm install
   ```

3. Instala Tailwind CSS:

   Si aún no has instalado Tailwind, ejecuta el siguiente comando para configurarlo:

   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init
   ```

   Luego, agrega los siguientes archivos de configuración en el archivo `tailwind.config.js`:

   ```js
   module.exports = {
     content: [
       "./src/**/*.{html,js,jsx,ts,tsx}",
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }
   ```

   Y en tu archivo `src/index.css`, agrega lo siguiente:

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

4. Inicia el servidor de desarrollo del frontend:

   ```bash
   npm start
   ```

   El frontend estará disponible en `http://localhost:3000`.

## Uso

### Backend

- El backend proporciona una API RESTful para gestionar los eventos. Las rutas disponibles incluyen:
  - `POST /auth/register` - Registro de usuario
  - `POST /auth/login` - Inicio de sesión
  - `GET /events` - Obtener todos los eventos
  - `POST /events` - Crear un nuevo evento
  - `PUT /events/:id` - Editar un evento existente
  - `DELETE /events/:id` - Eliminar un evento
  - `GET /events/filter` - Filtrar eventos por fecha y ubicación

### Frontend

- La interfaz de usuario permite a los usuarios crear, editar, eliminar y filtrar eventos.
- Los usuarios deben autenticarse antes de realizar cualquier acción.
- El frontend está diseñado usando **Tailwind CSS** para un diseño limpio y responsive.

## Tecnologías utilizadas

- **Backend**:
  - Node.js
  - Express
  - MongoDB
  - JWT para autenticación

- **Frontend**:
  - React.js
  - Tailwind CSS
  - Axios para las solicitudes HTTP

## Contribución

Si deseas contribuir a este proyecto, sigue estos pasos:

1. Haz un fork del repositorio
2. Crea una nueva rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza los cambios y haz un commit (`git commit -am 'Agregada nueva funcionalidad'`)
4. Haz push a tu rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request
