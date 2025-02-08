const mongoose = require('mongoose');
const Event = require('./models/Event');
const User = require('./models/User');
const Ticket = require('./models/Ticket');

const uri = 'mongodb://localhost:27017/ticketing';  

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

const userRoutes = require('./routes/userController');
const eventRoutes = require('./routes/eventController');
const ticketRoutes = require('./routes/ticketController');

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

// Routes
app.use('/api/users', userRoutes); 
app.use('/api/events', eventRoutes); 
app.use('/api/tickets', ticketRoutes); 

// Set up the server to listen on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
