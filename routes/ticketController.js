const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const { bookTicket, getUserTickets } = require('../controllers/ticketController');

// Book a ticket
router.post('/book', authenticate, bookTicket);

// Get tickets for the authenticated user
router.get('/', authenticate, getUserTickets);

module.exports = router;
