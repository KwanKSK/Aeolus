var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    path = require('path'),
    storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, './public/uploads/');
        },
        filename: function (req, file, callback) {
            callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
        }
    }),
    imageFilter = function (req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
            return callback(new Error('Only JPG, jpeg, PNG and GIF files are allowed.'), false);
        }
        callback(null, true);
    },
    upload = multer({ storage: storage, fileFilter: imageFilter }),

    // database
    Aircraft    = require('../models/aircraft'),
    Airline = require('../models/airline'),
    Airport = require('../models/airport'),
    User    = require('../models/user'),
    Flight  = require('../models/flight');

router.get('/', isLoggedIn, isAdmin, function(req, res){
    res.redirect('/admin/flight');
});

// Flight
router.get('/flight', isLoggedIn, isAdmin, function(req, res){
    Flight.find().sort({flightNumber:1}).populate('airline aircraft origin destination').exec(function (err, flight) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(flight);

            // Airport
            Airport.find({}, function (err, airport_result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(airport_result)
                    
                    // Airline
                    Airline.find({}, function (err, airline_result) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(airline_result)

                            // Aircraft
                            Aircraft.find({}, function (err, aircraft_result) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    console.log(aircraft_result)
                                    res.render('./admin/flight.ejs', { flights: flight, airports: airport_result, airlines: airline_result, aircrafts: aircraft_result })
                                }
                            }).sort({aircraftModel:1});

                        }
                    }).sort({name:1});

                }
            }).sort({country:1});
        }
    });
});

router.get('/flight/add', function(req, res){
    Flight.find().populate('airline aircraft origin destination').exec(function (err, flight) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(flight)

            // Airport
            Airport.find({}, function (err, airport_result) {
                if (err) {
                    console.log(err);
                }
                else {
                    console.log(airport_result)
                    
                    // Airline
                    Airline.find({}, function (err, airline_result) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            console.log(airline_result)

                            // Aircraft
                            Aircraft.find({}, function (err, aircraft_result) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    console.log(aircraft_result)
                                    res.render('./admin/flight-add.ejs', { flights: flight, airports: airport_result, airlines: airline_result, aircrafts: aircraft_result })
                                }
                            }).sort({aircraftModel:1});

                        }
                    }).sort({name:1});

                }
            }).sort({country:1});
        }
    });
});

router.post('/flight/add-new', function(req, res){
    var flightNumber    = req.body.flightNumber,
        airline     = req.body.airline,
        aircraft    = req.body.aircraft,

        origin      = req.body.origin,
        destination = req.body.destination,

        mileage = req.body.mileage,
        transit = req.body.transit;

        departure   = req.body.departure,
        arrival     = req.body.arrival,
        departureTime   = req.body.departureTime,
        arrivalTime     = req.body.arrivalTime,

        ecoBaggage  = req.body.ecoBaggage,
        ecoCabinBaggage = req.body.ecoCabinBaggage,
        ecoPriceAdult   = req.body.ecoPriceAdult,
        ecoPriceChild   = req.body.ecoPriceChild,
        ecoPriceInfant  = req.body.ecoPriceInfant,
        ecoEntertain    = req.body.ecoEntertain,
        ecoMeal = req.body.ecoMeal,
        ecoWifi = req.body.ecoWifi,
        ecoUsb  = req.body.ecoUsb,

        busBaggage  = req.body.busBaggage,
        busCabinBaggage = req.body.busCabinBaggage,
        busPriceAdult   = req.body.busPriceAdult,
        busPriceChild   = req.body.busPriceChild,
        busPriceInfant  = req.body.busPriceInfant,
        busEntertain    = req.body.busEntertain,
        busMeal = req.body.busMeal,
        busWifi = req.body.busWifi,
        busUsb  = req.body.busUsb,

        firstBaggage  = req.body.firstBaggage,
        firstCabinBaggage = req.body.firstCabinBaggage,
        firstPriceAdult   = req.body.firstPriceAdult,
        firstPriceChild   = req.body.firstPriceChild,
        firstPriceInfant  = req.body.firstPriceInfant,
        firstEntertain    = req.body.firstEntertain,
        firstMeal = req.body.firstMeal,
        firstWifi = req.body.firstWifi,
        firstUsb  = req.body.firstUsb;
    
    var newFlight =
    {
        flightNumber:   flightNumber,
        airline:    airline,
        aircraft:   aircraft,
        
        origin:     origin,
        destination:    destination,

        mileage:    mileage,
        transit:    transit,

        departure:  departure,
        departureTime:  departureTime,
        arrival:    arrival,
        arrivalTime:    arrivalTime,

        classInfo:{
            economy:{
                ecoRemainSeat: 0,
                ecoBaggage:    ecoBaggage,
                ecoCabinBaggage:   ecoCabinBaggage,

                ecoPriceAdult:  ecoPriceAdult,
                ecoPriceChild:  ecoPriceChild,
                ecoPriceInfant: ecoPriceInfant,

                ecoEntertain:   ecoEntertain,
                ecoMeal:    ecoMeal,
                ecoWifi:    ecoWifi,
                ecoUsb:     ecoUsb
            },

            business:{
                busRemainSeat: 0,
                busBaggage:    busBaggage,
                busCabinBaggage:   busCabinBaggage,

                busPriceAdult:  busPriceAdult,
                busPriceChild:  busPriceChild,
                busPriceInfant: busPriceInfant,

                busEntertain:   busEntertain,
                busMeal:    busMeal,
                busWifi:    busWifi,
                busUsb:     busUsb
            },

            firstclass:{
                firstRemainSeat: 0,
                firstBaggage:    firstBaggage,
                firstCabinBaggage:   firstCabinBaggage,

                firstPriceAdult:  firstPriceAdult,
                firstPriceChild:  firstPriceChild,
                firstPriceInfant: firstPriceInfant,

                firstEntertain:   firstEntertain,
                firstMeal:    firstMeal,
                firstWifi:    firstWifi,
                firstUsb:     firstUsb
            }

        }
    }

    Flight.create(newFlight, function (err, flight) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin/flight')
        }
    });
});

router.get('/flight/:id/edit', function(req, res){
    Flight.findById(req.params.id).populate('airline aircraft origin destination').exec(function (err, flight_result) {
        if (err) {
            console.log(err);
        }
        else {
            // Airport
            Airport.find({}, function (err, airport_result) {
                if (err) {
                    console.log(err);
                }
                else {
                    // Airline
                    Airline.find({}, function (err, airline_result) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            // Aircraft
                            Aircraft.find({}, function (err, aircraft_result) {
                                if (err) {
                                    console.log(err);
                                }
                                else {
                                    res.render('./admin/flight-edit.ejs', { flight: flight_result, airports: airport_result, airlines: airline_result, aircrafts: aircraft_result })
                                }
                            }).sort({aircraftModel:1});
                        }
                    }).sort({name:1});

                }
            }).sort({country:1});
        }
    });
});

router.put('/flight/:id/edit', function (req, res) {
    Flight.findByIdAndUpdate(req.params.id, req.body.flight, function (err, flight_updated) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin/flight');
        }
    });
});

router.delete('/flight/:id/del', function (req, res) {
    Flight.findByIdAndRemove(req.params.id, function(err, flight_deleted) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin/flight');
        }
    });
});


// Airline
router.get('/airline', isLoggedIn, isAdmin, function(req, res){
    Airline.find({}, function (err, airline_result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(airline_result);
            res.render('./admin/airline.ejs', { airlines: airline_result })
        }
    }).sort({name:1});
});

router.get('/airline/add', isLoggedIn, isAdmin, function(req, res){
    res.render('./admin/airline-add.ejs');
});

router.post('/airline/add-new', upload.single('image'), function (req, res) {
    req.body.airline.logo = '/uploads/' + req.file.filename;
    Airline.create(req.body.airline, function (err, newAirline) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin/airline');
        }
    });
});

router.get('/airline/:id/edit', function (req, res) {
    Airline.findById(req.params.id, function (err, airline_result) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('./admin/airline-edit', { airline: airline_result });
        }
    });
});

router.put('/airline/:id/edit', upload.single('image'), function (req, res) {
    console.log("Update Data");
    console.log(req.body.airline);
    if(req.file){
        req.body.airline.logo = '/uploads/' + req.file.filename;
    }
    Airline.findByIdAndUpdate(req.params.id, req.body.airline, function(err, airline_updated) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin/airline');
        }
    });
});

router.delete('/airline/:id/del', function (req, res) {
    Airline.findByIdAndRemove(req.params.id, function(err, flight_deleted) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin/airline')
        }
    });
});


// Airport
router.get('/airport', isLoggedIn, isAdmin, function (req, res) {
    Airport.find({}, function (err, airport_result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(airport_result);
            res.render('./admin/airport.ejs', { airports: airport_result })
        }
    }).sort({IATA:1});;
});

router.get('/airport/add', isLoggedIn, isAdmin, function(req, res){
    res.render('./admin/airport-add.ejs');
});

router.post('/airport/add-new', function (req, res) {
    var IATA    = req.body.IATA,
        name    = req.body.name,
        city    = req.body.city,
        country = req.body.country;

    var airport_info =
    {
        IATA:   IATA,
        name:   name,
        city:   city,
        country:    country
    }

    Airport.create(airport_info, function (err, newAirport) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin/airport');
        }
    });
});

router.get('/airport/:id/edit', function (req, res) {
    Airport.findById(req.params.id, function (err, airport_result) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('./admin/airport-edit', { airport: airport_result })
        }
    });
});

router.put('/airport/:id/edit', function (req, res) {
    console.log("Update Data")
    console.log(req.body.airport);
    Airport.findByIdAndUpdate(req.params.id, req.body.airport, function(err, flight_updated) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin/airport');
        }
    });
});

router.delete('/airport/:id/del', function (req, res) {
    Airport.findByIdAndRemove(req.params.id, function(err, flight_deleted) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin/airport')
        }
    });
});


// Aircraft
router.get('/aircraft' ,isLoggedIn ,isAdmin , function (req, res) {
    Aircraft.find({}, function (err, aircraft_result) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(aircraft_result);
            res.render('./admin/aircraft.ejs', { aircrafts: aircraft_result })
        }
    }).sort({aircraftModel:1});;
});   

router.get('/aircraft/add', function(req, res){
    res.render('./admin/aircraft-add.ejs');
});

router.post('/aircraft/add-new' ,isLoggedIn ,isAdmin , function (req, res) {
    var aircraftModel   = req.body.aircraftModel,

        ecoCheck    = req.body.ecoCheck,
        ecoSeatNumber   = req.body.ecoSeatNumber,
        ecoSeatLayout   = req.body.ecoSeatLayout,
        ecoSeatPitch    = req.body.ecoSeatPitch,

        busCheck    = req.body.busCheck,
        busSeatNumber   = req.body.busSeatNumber,
        busSeatLayout   = req.body.busSeatLayout,
        busSeatPitch    = req.body.busSeatPitch,

        firstCheck  = req.body.firstCheck,
        firstSeatNumber   = req.body.firstSeatNumber,
        firstSeatLayout   = req.body.firstSeatLayout,
        firstSeatPitch    = req.body.firstSeatPitch;

    var aircraft_info =
    {
        aircraftModel:  aircraftModel,
    
        economy: {
            ecoCheck: ecoCheck,
            ecoSeatNumber: ecoSeatNumber,
            ecoSeatLayout: ecoSeatLayout,
            ecoSeatPitch:  ecoSeatPitch
        },
        business: {
            busCheck: busCheck,
            busSeatNumber: busSeatNumber,
            busSeatLayout: busSeatLayout,
            busSeatPitch:  busSeatPitch
        },
        firstclass: {
            firstCheck: firstCheck,
            firstSeatNumber: firstSeatNumber,
            firstSeatLayout: firstSeatLayout,
            firstSeatPitch:  firstSeatPitch
        }
    };

    Aircraft.create(aircraft_info, function (err, newAircraft) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin/aircraft')
        }
    });
});

router.get('/aircraft/:id/edit', function (req, res) {
    Aircraft.findById(req.params.id, function (err, aircraft_result) {
        if (err) {
            console.log(err);
        }
        else {
            res.render('./admin/aircraft-edit', { aircraft: aircraft_result });
        }
    });
});

router.put('/aircraft/:id/edit', function (req, res) {
    console.log("Update Data");
    console.log(req.body.aircraft);
    Aircraft.findByIdAndUpdate(req.params.id, req.body.aircraft, function(err, flight_updated) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin/aircraft');
        }
    });

});

router.delete('/aircraft/:id/del', function (req, res) {
    Aircraft.findByIdAndRemove(req.params.id, function(err, flight_deleted) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/admin/aircraft');
        }
    });
});

// User
router.get('/user', isLoggedIn, isAdmin, function(req, res){   
    User.find({}, function(err,user_result){
        if (err) {
            console.log(err);
        }
        else {
            console.log(user_result);
            res.render('./admin/user.ejs', {user: user_result});
        }
    }).sort({username:1});
});


function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to log in frist.');
    res.redirect('/login');
}

function isAdmin(req, res, next){
    if(req.user.isAdmin == true){
        return next();
    }
    req.flash('error', "You are not admin. Don't do that ")
    res.redirect('/');
}



module.exports = router;