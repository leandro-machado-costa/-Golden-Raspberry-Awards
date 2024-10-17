require('dotenv').config(); // Load environment variables from .env

const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // Use PORT from .env or default to 3000

app.get('/', (req, res) => {
  res.send('API is running');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
