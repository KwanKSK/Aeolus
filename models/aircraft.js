var mongoose = require('mongoose');

var AircraftSchema = new mongoose.Schema({
    aircraftModel:  String,

    economy: {
        ecoCheck: {type:Boolean, default:false},
        ecoSeatNumber: Number,
        ecoSeatLayout: String,
        ecoSeatPitch:  Number  
    },
    business: {
        busCheck: {type:Boolean, default:false},
        busSeatNumber: Number,
        busSeatLayout: String,
        busSeatPitch:  Number
    },
    firstclass: {
        firstCheck: {type:Boolean, default:false},
        firstSeatNumber: Number,
        firstSeatLayout: String,
        firstSeatPitch:  Number
    }
});

module.exports = mongoose.model('Aircraft', AircraftSchema);