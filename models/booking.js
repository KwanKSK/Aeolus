var mongoose = require('mongoose');


var BookingSchema = new mongoose.Schema({
    bookingID:  String,

    flight: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flight'
    },

    contact: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contact'
    },

    booker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    travelers: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Traveler'
    },

    paymentstatus:{ type:String, default:"Waiting for payment"}

});

module.exports = mongoose.model('Booking', BookingSchema)