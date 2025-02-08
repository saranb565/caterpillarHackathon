const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  availtickets: { type: Number, required: true }, 
  price: { type: Number, required: true }        
});

eventSchema.index({ event_date: 1 }); 
eventSchema.index({name:"text", description:"text"});
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
