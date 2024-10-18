
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/students');

const app = express();

// Middleware to parse request bodies
app.use(bodyParser.json());

// MongoDB Atlas connection
mongoose.connect('mongodb+srv://subitha:12345@cluster0.cje3d.mongodb.net/studentDB?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch((err) => console.error('Connection failed', err));

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB Atlas'));

// Default route
app.get('/', (req, res) => {
    res.send('Welcome to the Student API');
});

// Student routes
app.use('/students', studentRoutes);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});


/* app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/students');

const app = express();

// Middleware to parse request bodies
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/studentDB')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Connection failed', err));

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

app.get('/', (req, res) => {
    res.send('Welcome to the Student API');
});

// Routes
app.use('/students', studentRoutes);

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});*/
