import winston from 'winston';
import 'winston-daily-rotate-file';

// Configurar el transporte para rotación diaria de archivos
const transport = new winston.transports.DailyRotateFile({
  filename: 'logs/application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d', // Mantener logs por 14 días
  level: 'info'
});

// Configurar el logger de Winston
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    transport,
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

export default logger;
