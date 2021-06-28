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
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username:{
            type: String,
        } 
    },

    traveler: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Traveler'
    },

    adult:  Number,
    child:  Number,
    infant: Number,

    seatclass:  String,
    totalPrice: Number,

    paymentstatus:{ type:String, default:"Waiting for payment"}

});

module.exports = mongoose.model('Booking', BookingSchema)