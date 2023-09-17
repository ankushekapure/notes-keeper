// Import required modules and setup
const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

// Connect to MongoDB
connectToMongo();

// Create an instance of the Express application
const app = express();

// Define the port for the server to listen on
const port = 80;

// Middleware to parse JSON data from incoming requests
app.use(express.json());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Define available routes and their associated modules
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});