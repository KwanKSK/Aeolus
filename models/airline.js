var mongoose = require('mongoose');

var AirlineSchema = new mongoose.Schema({
    IATA:   String,
    name:   String,
    logo:   String
});

module.exports = mongoose.model('Airline', AirlineSchema);