import swaggerJsDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Final Project API',
      version: '1.0.0',
      description: 'API documentation for the Final Project, including user authentication, posts, comments, and LLM features.',
      contact: {
        name: 'Support Team',
        email: 'support@example.com',
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT',
      },
    },
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
  apis: ['./src/routes/*.ts', './dist/routes/*.js'], // Ensure compatibility with compiled code
};

export const swaggerSpec = swaggerJsDoc(options);
