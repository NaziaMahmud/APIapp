// Import Express framework
const express = require('express');

// Create an Express application
const app = express();

// Set the port
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Basic route - GET request
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to my API!',
    status: 'success',
    timestamp: new Date().toISOString()
  });
});

// GET route - Get all users (example)
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
  ];
  
  res.json({
    status: 'success',
    data: users,
    count: users.length
  });
});

// GET route - Get single user by ID
app.get('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = { id: userId, name: 'Sample User', email: 'user@example.com' };
  
  res.json({
    status: 'success',
    data: user
  });
});

// POST route - Create new user
app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  const newUser = {
    id: Date.now(), // Simple ID generation
    name: name,
    email: email,
    createdAt: new Date().toISOString()
  };
  
  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    data: newUser
  });
});

// PUT route - Update user
app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const { name, email } = req.body;
  
  const updatedUser = {
    id: userId,
    name: name,
    email: email,
    updatedAt: new Date().toISOString()
  };
  
  res.json({
    status: 'success',
    message: 'User updated successfully',
    data: updatedUser
  });
});

// DELETE route - Delete user
app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  
  res.json({
    status: 'success',
    message: `User with ID ${userId} deleted successfully`
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: 'Something went wrong!'
  });
});

// Handle 404 - Route not found
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route not found'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📋 API endpoints:`);
  console.log(`   GET    /                 - Welcome message`);
  console.log(`   GET    /api/users        - Get all users`);
  console.log(`   GET    /api/users/:id    - Get user by ID`);
  console.log(`   POST   /api/users        - Create new user`);
  console.log(`   PUT    /api/users/:id    - Update user`);
  console.log(`   DELETE /api/users/:id    - Delete user`);
});