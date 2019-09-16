const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
require('dotenv').config();
mongoose.set('useCreateIndex', true);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Define API routes
app.use(routes);

// Connect to the Mongo DB
const url = process.env.MONGODB_URI || 'mongodb://localhost/googlebooks';
console.log('Connecting to db');
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.once('open', _ => {
  console.log('Database connected:', url);
});

db.on('error', err => {
  console.error('connection error:', err);
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`API Server listening on port: ${PORT}`);
});
