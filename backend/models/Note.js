const mongoose = require('mongoose');
const { Schema } = mongoose;

// Defining the schema for Notes collection
const NotesSchema = new Schema({
  // Reference to the user who created this note
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Refers to the 'User' model
  },
  
  // Title of the note (required)
  title: {
    type: String,
    required: true,
  },

  // Description of the note (required)
  description: {
    type: String,
    required: true,
  },

  // Tag for categorizing the note (default is 'general')
  tag: {
    type: String,
    default: 'general',
  },

  // Date when the note was created (default is the current date and time)
  date: {
    type: Date,
    default: Date.now, // This function is called when a document is saved
  }
});

// Export the model for the 'notes' collection
module.exports = mongoose.model('Note', NotesSchema);