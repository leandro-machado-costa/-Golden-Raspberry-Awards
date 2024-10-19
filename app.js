require('dotenv').config();

const express = require('express');
const { initDB } = require('./src/config/database');
const { loadCSV } = require('./src/services/csvService'); 
const awardRoutes = require('./src/routes/awardRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/config/swaggerOptions'); 

const app = express();

function configureMiddleware() {
  app.use(errorHandler);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
  app.use('/api', awardRoutes);
}

function startServer() {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

function loadDataAndStartServer() {
  loadCSV()
    .then(() => {
      startServer();
    })
    .catch((error) => {
      console.error('Error loading CSV:', error);
    });
}

function initializeApp() {
  initDB();
  loadDataAndStartServer();
}

configureMiddleware();
module.exports = app;

if (require.main === module) {
  initializeApp();
}
