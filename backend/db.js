// Import the Mongoose library
const mongoose = require('mongoose');

// Define the MongoDB URI for the database connection
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

/**
 * Function to establish a connection to MongoDB using Mongoose.
 */
const connectToMongo = async () => {
    try {
        // Connect to MongoDB using the specified URI
        await mongoose.connect(mongoURI);

        // Log a success message if the connection is successful
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        // Handle any errors that occur during the connection attempt
        console.error("Error connecting to MongoDB:", error.message);
        throw error; // Re-throw the error for the caller to handle
    }
}

// Export the connectToMongo function for use in other parts of the application
module.exports = connectToMongo;
