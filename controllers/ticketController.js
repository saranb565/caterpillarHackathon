const Ticket = require('../models/Ticket');
const Event = require('../models/Event');
const User = require('../models/User');

const bookTicket = async (req, res) => {
  const { eventId, userId, ticketType, quantity } = req.body;

  try {
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.availtickets < quantity) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    const totalPrice = event.price * quantity;

    const ticket = new Ticket({
      event_id: eventId,
      user_id: userId,
      ticket_type: ticketType,
      quantity,
      total_price: totalPrice,
    });

    await ticket.save();

    // Update the event's available tickets
    event.availtickets -= quantity;
    await event.save();

    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Tickets for a User
const getUserTickets = async (req, res) => {
  const { userId } = req.params;

  try {
    const tickets = await Ticket.find({ user_id: userId }).populate('event_id', 'name description location');
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { bookTicket, getUserTickets };
