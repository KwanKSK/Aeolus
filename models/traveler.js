var mongoose = require('mongoose');

var TravelerSchema = new mongoose.Schema({
    title:  String,
    firstname:  String,
    lastname:   String,

    birthDate:  Date,
    nationality:    String,

    passportNum:    String,
    passportExp:    Date
});

module.exports = mongoose.model('Traveler', TravelerSchema)