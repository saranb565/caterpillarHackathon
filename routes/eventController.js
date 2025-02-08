const express = require('express');
const router = express.Router();
const { createEvent, getEvents, getEventPopularity, searchEvents } = require('../controllers/eventController');

// Create a new event
router.post('/register', createEvent);

// Get all events
router.get('/', getEvents);

// Get popular events based on ticket sales
router.get('/popularity', getEventPopularity);

// Search events
router.get('/search', searchEvents);

module.exports = router;
