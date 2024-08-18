import mysql from 'mysql2';
import dotenv from 'dotenv';

// Cargar las variables de entorno
dotenv.config();

// Crear la conexión a la base de datos
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,  // Agrega el puerto aquí
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Promisificar la conexión para usar `async/await`
const promisePool = pool.promise();

export default promisePool;
