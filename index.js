import express from 'express';
import port from './config/port.js';
import noteRoutes from './routes/noteRoutes.js';
import logger from './config/logger.js';
import cors from 'cors';

const BASE_PATH = '/note/service/crud'
const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.use(BASE_PATH, noteRoutes);

app.use((req, res, next) => {
    logger.info(`Received request: ${req.method} ${req.url}`);
    next();
  });


app.listen(port, () => {
  logger.info(`Servidor escuchando en http://localhost:${port}`);
});
