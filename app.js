require('dotenv').config();

const express = require('express');
const { initDB } = require('./src/config/database');
const loadCSV = require('./src/services/csvService');
const awardRoutes = require('./src/routes/awardRoutes');
const errorHandler = require('./src/middleware/errorHandler');
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./src/config/swaggerOptions'); 

const app = express();
app.use(errorHandler); 

const port = process.env.PORT || 3000;

initDB(); 


loadCSV().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}).catch(error => {
  console.error('Error loading CSV:', error); 
});


app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api', awardRoutes);
