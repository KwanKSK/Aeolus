var express = require('express'),
    router = express.Router(),
    Flight = require('../models/flight'),
    User    = require('../models/user'),
    Airport = require('../models/airport'),
    Booking = require('../models/booking');


router.get('/', function (req, res) {
    Airport.find({}, function (err, airport_result) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("flight/flight.ejs", { airports: airport_result })
        }
    }).sort({country: 1});
});

router.post('/search', function (req, res) {

    var origin  = req.body.origin,
        destination     = req.body.destination,
        departureDate   = req.body.departureDate,

        seatclass   = req.body.seatclass,
        adult   = req.body.adult,
        child   = req.body.child,
        infant  = req.body.infant;


    seat = req.body.seat


    var searchData =
    {  
        origin: origin,
        destination:    destination,
        departureDate: departureDate,

        seatclass:  seatclass,
        adult:  adult,
        child:  child,
        infant: infant
    };


    var flightQuery
    if (flightclass !== "all") {
        flightQuery = {
            flightclass: flightclass,
            origin: origin,
            destination: destination
        }
    } else {
        flightQuery = {
            origin: origin,
            destination: destination
        }
    }


    Flight.find(flightQuery).populate("airline origin destination").exec(function (err, flights) {
        if (err) {
            console.log(err);
        }
        else {
            flights.forEach(flight => {
                searchData.origin = flight.origin.IATA;
            });

            
            
            if (origin == destination){
                req.flash('error', 'Origin and Destination cannot be same loacation.');
                res.redirect('/flight');
                // Check if there's no result found
            } else if (flights.length == 0) {
                req.flash('error', 'flight not found.');
                res.redirect('/flight');
                // Check if departure date is late then return date
            } else if (returnDate < departDate) {
                req.flash('error', 'departure date is late then return date.')
                res.redirect('/flight');
            } else {
                res.render("flight/flights-list.ejs", { flights: flights, searchData })
            }


        }
    });
});

module.exports = router;