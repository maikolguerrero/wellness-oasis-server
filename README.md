# wellness-oasis-server
Servidor backend para la aplicación de SPA "Wellness Oasis". El cliente frontend que se complementa con este servidor se encuentra en este repositorio: [wellness-oasis-client](https://github.com/maikolguerrero/wellness-oasis-client)

## Demostración
Aquí puedes ver en YouTube una demostración de la aplicación en funcionamiento usándolo con el Frontend:
[![App con React y React Router](https://i9.ytimg.com/vi/_77GlIl4PgA/mqdefault.jpg?sqp=CMiZgqUG-oaymwEmCMACELQB8quKqQMa8AEB-AH-CYAC0AWKAgwIABABGFEgXihlMA8=&rs=AOn4CLAJ1shmPZFt9yiTFwvX_fDiBpfv0Q)](https://youtu.be/_77GlIl4PgA)

## Características
- Gestión de usuarios y autenticación.
- Funcionalidad CRUD de servicios, reservas, artículos y testimonios.
- Reservas de servicios por parte de los usuarios.

## Tecnologías utilizadas
- JavaScript
- Node.js
- Express.js
- MySQL
- JWT (JSON Web Tokens)

## Instalación
- **1.** Clona el repositorio:
```
git clone https://github.com/maikolguerrero/wellness-oasis-server.git
```
- **2.**  Ingresa al directorio del proyecto:
```
cd wellness-oasis-server
```
- **3.**  Instala las dependencias:
```
npm install
```
- **4.**  Importa la base de datos MySQL que se encuentra en la carpeta `db`.
- **5.** Configura las variables de entorno en un archivo `.env`. Puedes basarte en el archivo `.env.example` proporcionado.

## Uso
- **1.** Ejecuta la aplicación: 
```
npm start
```
- **2.**  El servidor estará escuchando en el puerto definido en la variable de entorno `PORT`.
- **3.**  Utiliza las rutas y métodos HTTP definidos en el servidor para interactuar con los admins, servicios, artículos, reservas y testimonios.
