import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0', // Swagger version
    info: {
      title: 'News Website API', // API title
      version: '1.0.0', // API version
    },
  },
  apis: ['./src/routes/*.ts'], // Path to the route files
};

export const swaggerSpec = swaggerJsDoc(options);
