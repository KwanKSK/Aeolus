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

router.post('/search', function(req, res){
    var origin  = req.body.origin,
        destination = req.body.destination,
        departure   = req.body.departure,
        seatclass   = req.body.seatclass, 
        adult   = req.body.adult,
        child   = req.body.child,
        infant  = req.body.infant;

    var passenger = parseInt(adult) +  parseInt(child) + parseInt(infant);
 
    var searchData = {
        origin: origin,
        destination: destination,      
        departure: departure,
        seatclass: seatclass,
        passenger: passenger,
        adult: adult,
        child: child,
        infant: infant
    };

    var flightQuery = {
        origin: origin,
        destination: destination,
        departure: departure
    };

    console.log(flightQuery);

    Flight.find(flightQuery).populate("airline aircarft origin destination").exec(function(err, flights) {
        if (err) {
            console.log(err);
        } else {
            flights.forEach(flight => {
                searchData.departure = flight.departure;
            });
            flights.forEach(flight => {
                searchData.origin = flight.origin;
            });
            flights.forEach(flight => {
                searchData.destination = flight.destination;
            });

            console.log(searchData);
            console.log(flightQuery);
            // If no result found
            
            if (origin == destination){
                req.flash('error', 'Origin cannot be same as Destination.');
                res.redirect('/flight');
            } else if (infant>adult){
                req.flash('error', 'Infants cannot more than adults');
                res.redirect('/flight');
            } else if (flights.length == 0) {
                req.flash('error', 'Flight not found.');
                res.redirect('/flight');
            } else {
                res.render("./flight/flight-list.ejs", { flights: flights, searchData })
            }
            
        }
    });
    
});

router.post('/:id/confirm', function (req, res) {
    var flightNumber = req.body.flightNumber,
        departure = req.body.departure,
        seatclass   = req.body.seatclass, 
        adult   = req.body.adult,
        child   = req.body.child,
        infant  = req.body.infant,
        passenger = req.body.passenger;
        
    var totalPrice;

    var bookinfo =
    {
        departure: departure,
        adult:  adult,
        child:  child,
        infant: infant,
        seatclass:  seatclass,
        passenger:  passenger
    };


    Flight.findOne({ _id: flightNumber }).populate("airline aircraft origin destination").exec(function (err, flight) {
        if (err) {
            console.log(err);
        }
        else {

            res.render("flight/flight-confirm.ejs", { flight: flight, bookinfo })
        }
    });
});

router.post('/:id/booking', function (req, res) {
    var flightNumber = req.params.id,
        departure = req.body.departure,
        seatclass   = req.body.seatclass, 
        adult   = req.body.adult,
        child   = req.body.child,
        infant  = req.body.infant,
        passenger   = req.body.passenger,
        totalPrice  = req.body.totalPrice;

    if (req.isAuthenticated()) {
        console.log("User log in");
        var booker_id = req.user._id,
            booker_username = req.user.firstname;
    }

    var bookinfo =
    {
        departure: departure,
        seatclass: seatclass,

        adult:  adult,
        child:  child,
        infant: infant,
        passenger: passenger,

        booker: {
            id: booker_id,
            username: booker_username
        },

        flight: flightNumber,
        totalPrice: totalPrice
    };

    console.log(flightNumber);

    Flight.findOne({ _id: flightNumber }).populate("airline aircraft origin destination").exec(function (err, flightbooked) {
        if (err) {
            console.log(err);
        } else {

            Booking.create(bookinfo, function (err, newbooking) {
                if (err) {
                    console.log(err);
                } else {
                    if (req.isAuthenticated()) {
                    User.updateOne(
                        { _id: req.user._id },
                        { $set: { current_booking: newbooking._id } }
                        , function (err, bookingUpdate) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log("UserBooked");
                                res.render("flight/flight-booking.ejs", { flight: flightbooked, bookedinfo: newbooking, booked: bookinfo });
                            }
                        });
                    } else {
                        console.log("normalBooked");
                        res.render("flight/flight-booking.ejs", { flight: flightbooked, bookedinfo: newbooking, booked:bookinfo });
                    }
                }
            });
        }
    });
});

/*
router.post('/sort', function (req, res) {

    var sortType = req.body.sortType;
        origin  = req.body.origin,
        destination = req.body.destination,
        departure   = req.body.departure,
        seatclass   = req.body.seatclass, 
        adult   = req.body.adult,
        child   = req.body.child,
        infant  = req.body.infant;
    
    var passenger = parseInt(adult) +  parseInt(child) + parseInt(infant);

    Airport.findOne({ city: to }, function (err, airport) {
        if (err) {
            console.log(err)
        } else {
            let airport_id = airport._id

            var searchData = {
                origin: origin,
                destination: destination,      
                departure: departure,
                seatclass: seatclass,
                passenger: passenger,
                adult: adult,
                child: child,
                infant: infant
            };
        
            var flightQuery = {
                origin: airport_id,
                destination: airport_id
            }

            var query;
            if (sortType === "lowPrice") {
                query = {}
            }
            else if (sortType === "highPrice") {
                query = {}
            }


            Flight.find(flightQuery).sort(query).populate("airline aircraft origin destination").exec(function (err, flights) {
                if (err) {
                    console.log(err);
                }
                else {

                    flights.forEach(flight => {
                        searchData.destination = flight.destination.IATA;
                    });

                    res.render("flight/flight-list.ejs", { flights: flights, searchData, seatclass })
                }
            });
        }
    });

});
*/
module.exports = router;