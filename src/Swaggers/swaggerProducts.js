const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Productos',
      version: '1.0.0',
      description: 'Documentación para la API de productos con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor local',
      },
    ],
    components: {
      schemas: {
        Product: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '64abc123def456gh789i',
            },
            userId: {
              type: 'string',
              example: '64abc098xyz765fg432j',
            },
            name: { // Asegúrate de que esté aquí
              type: 'string',
              example: 'MiProducto',
            },
            categories: {
              type: 'string',
              example: 'Ropa',
            },
            image_1: {
              type: 'string',
              example: 'https://res.cloudinary.com/tu-cloud/image/upload/v123456/image1.jpg',
            },
            image_2: {
              type: 'string',
              example: 'https://res.cloudinary.com/tu-cloud/image/upload/v123456/image2.jpg',
            },
            image_3: {
              type: 'string',
              example: 'https://res.cloudinary.com/tu-cloud/image/upload/v123456/image3.jpg',
            },
            stock: {
              type: 'integer',
              example: 10,
            },
            price: {
              type: 'number',
              example: 100.5,
            },
            quantity: {
              type: 'integer',
              example: 1,
            },
            size: {
              type: 'string',
              example: 'L',
            },
            status: {
              type: 'string',
              enum: ['available', 'unavailable', 'sold'],
              example: 'available',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-11-19T12:34:56.789Z',
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2024-11-19T12:34:56.789Z',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Ajusta esto a la ubicación de tus archivos de rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
