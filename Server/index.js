  
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TodoModel = require('./Models/Todo');
const app = express();
  
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/taskdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Database connection error:', err));

// Get all tasks
app.get('/get', (req, res) => {
  TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// Add a new task
app.post('/add', (req, res) => {
  const { title, description } = req.body; // Accept title and description

  if (!title || title.trim() === '') {
    return res.status(400).json({ message: 'Task title is required' });
  }

  TodoModel.create({ title, description })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// Update (Mark task as completed or edit task details)
app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  TodoModel.findByIdAndUpdate(id, {
    ...(title && { title }), // If title is provided, update it
    ...(description && { description }), // If description is provided, update it
    ...(completed !== undefined && { completed }) // Update the "completed" status
  }, { new: true })
    .then(result => res.json(result))
    .catch(err => res.json(err));
});

// Delete a task
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  
  TodoModel.findByIdAndDelete(id)
    .then(result => res.json({ message: 'Task deleted', result }))
    .catch(err => res.json(err));
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
