const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: { // Corrected field definition
    type: Date,
    default: Date.now // Automatically set the current date and time
  }
});

module.exports = mongoose.model('Todo', todoSchema);


  
    