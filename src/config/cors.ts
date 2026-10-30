import cors, { CorsOptions } from 'cors';

//Urls permitidas para CORS
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:jorge',
  'http://funvalestudiantes.org'
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Permitir peticiones sin origen (como Postman o curl) o si está en la lista blanca
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Acceso no permitido por la política CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-api-key'],
  credentials: true
};

export const corsMiddleware = cors(corsOptions);
