const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'To-Do API',
      version: '1.0.0',
      description: 'API documentation for the To-Do backend',
    },
    servers: [
      {
        url: 'https://to-do-nppa.onrender.com', // Cambia esta URL al despliegue en Render
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const swaggerSpecs = swaggerJsDoc(options);

const setupSwagger = (app) => {
  app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
};

module.exports = setupSwagger;
