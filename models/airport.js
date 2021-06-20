var mongoose = require('mongoose');

var AirportSchema = new mongoose.Schema({
    IATA:   String,
    name:   String,
    city:   String,
    country:    String
});

module.exports = mongoose.model('Airport', AirportSchema);