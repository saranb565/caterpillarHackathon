const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  event_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event', 
    required: true
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  purchase_date: { type: Date, default: Date.now },
  ticket_type: { type: String, required: true },
  quantity: { type: Number, required: true },
  total_price: { type: Number, required: true }
});

ticketSchema.index({ user_id: 1, ticket_type: 1 });

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
