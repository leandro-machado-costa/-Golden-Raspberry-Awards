const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Golden Raspberry Awards API',
      version: '1.0.0',
      description: 'API to manage movie data and award intervals.',
      contact: {
        name: 'Leandro Machado Costa',
        email: 'leandro.275@gmail.com'
      },
      servers: [{ url: `http://${process.env.ADDRESS || 'localhost'}:${process.env.PORT || 3000}` }]
    },
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
module.exports = swaggerDocs;
