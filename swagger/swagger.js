const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'API REST E-commerce - Documentación',
    description: 'API colaborativa con Node.js, Express y TypeScript',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http'],
  securityDefinitions: {
    ApiKeyAuth: {
      type: 'apiKey',
      in: 'header',
      name: 'x-api-key',
      description: 'Ingresa tu API Key para autorizar endpoints protegidos'
    }
  }
};

const outputFile = './swagger/swagger-output.json';
const endpointsFiles = ['./src/index.ts'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  console.log('Documentación Swagger generada con éxito');
});
