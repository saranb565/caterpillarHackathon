const Event = require('../models/Event');
const Ticket = require('../models/Ticket');

const createEvent = async (req, res) => {
  const { event_id, name, description, location, availtickets, price } = req.body;

  try {
    const newEvent = new Event({event_id,name, description, location, availtickets, price });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEventPopularity = async (req, res) => {
  try {
    const popularEvents = await Ticket.aggregate([
      {
        $group: {
          _id: "$event_id",
          totalTicketsSold: { $sum: "$quantity" },
          totalRevenue: { $sum: "$total_price" },
        },
      },
      { $sort: { totalTicketsSold: -1 } },
      {
        $lookup: {
          from: 'events',
          localField: '_id',
          foreignField: '_id',
          as: 'eventDetails',
        },
      },
    ]);

    res.status(200).json(popularEvents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchEvents = async (req, res) => {
  const query = req.query.q;

  try {
    const events = await Event.find({
      $text: { $search: query }, 
    });
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createEvent, getEvents, getEventPopularity, searchEvents };
