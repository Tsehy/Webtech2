const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Card = new Schema({
  name: {
    type: String
  },
  amount: {
    type: Number
  },
  cost: {
    type: Number
  }
}, {
  collection: 'cards'
})

module.exports = mongoose.model('Card', Card)
