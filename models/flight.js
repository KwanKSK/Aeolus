var mongoose = require('mongoose');

var FlightSchema = new mongoose.Schema({
    flightNumber:   String,
    
    airline:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Airline'
    },
    aircraft:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Aircraft',
    },
    origin:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Airport'
    },
    destination:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Airport'
    },

    departure:  Date,
    arrival:    Date,

    mileage:    Number,

    classInfo:{
        economy:{
            ecoRemainSeat: Number,
            ecoBaggage:    Number,
            ecoCabinBaggage:   Number,

            ecoPriceAdult:  Number,
            ecoPriceChild:  Number,
            ecoPriceInfant: Number,

            ecoEntertain:   { type: Boolean, default: false},
            ecoMeal:    { type: Boolean, default: false},
            ecoWifi:    { type: Boolean, default: false},
            ecoUsb:     { type: Boolean, default: false}
        },

        business:{
            busRemainSeat: Number,
            busBaggage:    Number,
            busCabinBaggage:   Number,

            busPriceAdult:  Number,
            busPriceChild:  Number,
            busPriceInfant: Number,

            busEntertain:   { type: Boolean, default: false},
            busMeal:    { type: Boolean, default: false},
            busWifi:    { type: Boolean, default: false},
            busUsb:     { type: Boolean, default: false}
        },

        firstclass:{
            firstRemainSeat: Number,
            firstBaggage:    Number,
            firstCabinBaggage:   Number,

            firstPriceAdult:  Number,
            firstPriceChild:  Number,
            firstPriceInfant: Number,

            firstEntertain:   { type: Boolean, default: false},
            firstMeal:    { type: Boolean, default: false},
            firstWifi:    { type: Boolean, default: false},
            firstUsb:     { type: Boolean, default: false}
        }

    }

});

module.exports = mongoose.model('Flight', FlightSchema);