const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the User schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true, // This field is required
  },
  email: {
    type: String,
    required: true, // This field is required
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true, // This field is required
  },
  date: {
    type: Date,
    default: Date.now, // Set the default date to the current date
  }
});

// Create and export the User model based on the UserSchema
const User = mongoose.model('user', UserSchema);
module.exports = User;
