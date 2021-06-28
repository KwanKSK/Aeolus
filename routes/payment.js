var express = require('express'),
    router = express.Router(),
    Booking = require('../models/booking'),
    Contact = require('../models/contact'),
    Traveler = require('../models/traveler')

function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
       }
       return result;
}

router.post('/:book_id', function (req, res) {

    var bookingID   = makeid(8); 

    var adult   = req.body.adult,
        child   = req.body.child,
        infant  = req.body.infant,
        totalPrice  = req.body.totalPrice,
        seatclass   = req.body.seatclass;

    var passenger = parseInt(adult) +  parseInt(child) + parseInt(infant);

    var contactTitle    = req.body.contactTitle,
        contactFirstname= req.body.contactFirstname,
        contactLastname = req.body.contactLastname,
        contactTel  = req.body.contactTel,
        contactEmail= req.body.contactEmail;

    var contactinfo = {
        title:  contactTitle,
        firstname: contactFirstname,
        lastname: contactLastname,
        tel: contactTel,
        email: contactEmail
    }
    console.log(req.params.book_id)

    Contact.create(contactinfo, function (err, newcontact) {
        if (err) {
            console.log(err);
        } else {
            Booking.findById(req.params.book_id, async function (err, booking_result) {
                if (err) {
                    console.log(err);
                } else {
                    Booking.updateOne(
                        { _id: booking_result._id },
                        { $set: { contact: newcontact._id, bookingID: bookingID } }
                        , function (err, bookingUpdate) {
                            if (err) {
                                console.log(err);
                            } else {
                                
                            }
                        });
                    
                    
                    if(booking_result.adult == 1){
                        var travelerTitle = req.body.travelerTitle,
                            travelerFirstname = req.body.travelerFirstname,
                            travelerLastname = req.body.travelerLastname,
                            travelerBirth = req.body.travelerBirth,
                            travelerNationallity = req.body.travelerNationallity,
                            travelerPassportnumber = req.body.travelerPassportnumber,
                            travelerPassportdate = req.body.travelerPassportdate;

                        var tarveler_info = {
                            title: travelerTitle,
                            firstname: travelerFirstname,
                            lastname: travelerLastname,
                            birthDate: travelerBirth,
                            nationality: travelerNationallity,
                            passportNum: travelerPassportnumber,
                            passportExp: travelerPassportdate
                        }

                        console.log("1 traveler")
                        console.log(tarveler_info)
                        
                        Traveler.create(tarveler_info, function (err, newtraveler) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(newtraveler);
                                    Booking.updateOne(
                                    { _id: booking_result._id },
                                    { $push: { travelers:newtraveler } }
                                    , function (err, bookingUpdate) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log("traveler");
                                    }
                                });

                            }

                        });
                    } else {
                        var travelerTitle = req.body.travelerTitle,
                            travelerFirstname = req.body.travelerFirstname,
                            travelerLastname = req.body.travelerLastname,
                            travelerBirth = req.body.travelerBirth,
                            travelerNationallity = req.body.travelerNationallity,
                            travelerPassportnumber = req.body.travelerPassportnumber,
                            travelerPassportdate = req.body.travelerPassportdate;
    
                        for (let index = 0; index < booking_result.adult; index++) {
                            var travelerTitle = travelersTitle[index],
                                travelerFirstname = travelersFirstname[index],
                                travelerLastname = travelersLastname[index],
                                travelerBirth = travelersBirth[index],
                                travelerNationallity = travelersNationallity[index],
                                travelerPassportnumber = travelersPassportnumber[index]
                                travelerPassportdate = travelersPassportdate[index]

                            var tarveler_info = {       
                                title: travelerTitle,
                                firstname: travelerFirstname,
                                lastname: travelerLastname,
                                birthDate: travelerBirth,
                                nationality: travelerNationallity,
                                passportNum: travelerPassportnumber,
                                passportExp: travelerPassportdate
                            }
    
                            Traveler.create(tarveler_info, function (err, newtraveler) {
                                if (err) {
                                    console.log(err);
                                } else {

                                        Booking.updateOne(
                                        { _id: booking_result._id },
                                        { $push: { travelers:newtraveler } }
                                        , function (err, bookingUpdate) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                        console.log("To Update");         
                                        }
                                    });
                                    
                                }
    
                            });
    
                        } 
                    }

                    if(booking_result.child == 1){
                        var travelerTitle = req.body.travelerTitle,
                            travelerFirstname = req.body.travelerFirstname,
                            travelerLastname = req.body.travelerLastname,
                            travelerBirth = req.body.travelerBirth,
                            travelerNationallity = req.body.travelerNationallity,
                            travelerPassportnumber = req.body.travelerPassportnumber,
                            travelerPassportdate = req.body.travelerPassportdate;

                        var tarveler_info = {
                            title: travelerTitle,
                            firstname: travelerFirstname,
                            lastname: travelerLastname,
                            birthDate: travelerBirth,
                            nationality: travelerNationallity,
                            passportNum: travelerPassportnumber,
                            passportExp: travelerPassportdate
                        }

                        console.log("1 traveler")
                        console.log(tarveler_info)
                        
                        Traveler.create(tarveler_info, function (err, newtraveler) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(newtraveler);
                                    Booking.updateOne(
                                    { _id: booking_result._id },
                                    { $push: { travelers:newtraveler } }
                                    , function (err, bookingUpdate) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log("traveler");
                                    }
                                });

                            }

                        });
                    } else {
                        var travelerTitle = req.body.travelerTitle,
                            travelerFirstname = req.body.travelerFirstname,
                            travelerLastname = req.body.travelerLastname,
                            travelerBirth = req.body.travelerBirth,
                            travelerNationallity = req.body.travelerNationallity,
                            travelerPassportnumber = req.body.travelerPassportnumber,
                            travelerPassportdate = req.body.travelerPassportdate;
    
                        for (let index = 0; index < booking_result.child; index++) {
                            var travelerTitle = travelersTitle[index],
                                travelerFirstname = travelersFirstname[index],
                                travelerLastname = travelersLastname[index],
                                travelerBirth = travelersBirth[index],
                                travelerNationallity = travelersNationallity[index],
                                travelerPassportnumber = travelersPassportnumber[index]
                                travelerPassportdate = travelersPassportdate[index]

                            var tarveler_info = {       
                                title: travelerTitle,
                                firstname: travelerFirstname,
                                lastname: travelerLastname,
                                birthDate: travelerBirth,
                                nationality: travelerNationallity,
                                passportNum: travelerPassportnumber,
                                passportExp: travelerPassportdate
                            }
    
                            Traveler.create(tarveler_info, function (err, newtraveler) {
                                if (err) {
                                    console.log(err);
                                } else {

                                        Booking.updateOne(
                                        { _id: booking_result._id },
                                        { $push: { travelers:newtraveler } }
                                        , function (err, bookingUpdate) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                        console.log("To Update");         
                                        }
                                    });
                                    
                                }
    
                            });
    
                        } 
                    }

                    if(booking_result.infant == 1){
                        var travelerTitle = req.body.travelerTitle,
                            travelerFirstname = req.body.travelerFirstname,
                            travelerLastname = req.body.travelerLastname,
                            travelerBirth = req.body.travelerBirth,
                            travelerNationallity = req.body.travelerNationallity,
                            travelerPassportnumber = req.body.travelerPassportnumber,
                            travelerPassportdate = req.body.travelerPassportdate;

                        var tarveler_info = {
                            title: travelerTitle,
                            firstname: travelerFirstname,
                            lastname: travelerLastname,
                            birthDate: travelerBirth,
                            nationality: travelerNationallity,
                            passportNum: travelerPassportnumber,
                            passportExp: travelerPassportdate
                        }

                        console.log("1 traveler")
                        console.log(tarveler_info)
                        
                        Traveler.create(tarveler_info, function (err, newtraveler) {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(newtraveler);
                                    Booking.updateOne(
                                    { _id: booking_result._id },
                                    { $push: { travelers:newtraveler } }
                                    , function (err, bookingUpdate) {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        console.log("traveler");
                                    }
                                });

                            }

                        });
                    } else {
                        var travelerTitle = req.body.travelerTitle,
                            travelerFirstname = req.body.travelerFirstname,
                            travelerLastname = req.body.travelerLastname,
                            travelerBirth = req.body.travelerBirth,
                            travelerNationallity = req.body.travelerNationallity,
                            travelerPassportnumber = req.body.travelerPassportnumber,
                            travelerPassportdate = req.body.travelerPassportdate;
    
                        for (let index = 0; index < booking_result.infant; index++) {
                            var travelerTitle = travelersTitle[index],
                                travelerFirstname = travelersFirstname[index],
                                travelerLastname = travelersLastname[index],
                                travelerBirth = travelersBirth[index],
                                travelerNationallity = travelersNationallity[index],
                                travelerPassportnumber = travelersPassportnumber[index]
                                travelerPassportdate = travelersPassportdate[index]

                            var tarveler_info = {       
                                title: travelerTitle,
                                firstname: travelerFirstname,
                                lastname: travelerLastname,
                                birthDate: travelerBirth,
                                nationality: travelerNationallity,
                                passportNum: travelerPassportnumber,
                                passportExp: travelerPassportdate
                            }
    
                            Traveler.create(tarveler_info, function (err, newtraveler) {
                                if (err) {
                                    console.log(err);
                                } else {

                                        Booking.updateOne(
                                        { _id: booking_result._id },
                                        { $push: { travelers:newtraveler } }
                                        , function (err, bookingUpdate) {
                                        if (err) {
                                            console.log(err);
                                        } else {
                                        console.log("To Update");         
                                        }
                                    });
                                    
                                }
    
                            });
    
                        } 
                    }

                    res.redirect('/flight/payment/' + booking_result._id);
                }
                
            });       
        }
    });
});



router.get('/:book_id', function (req, res) {
    Booking.findById(req.params.book_id).populate("contact").populate({ path: 'travelers' }).populate({ path: 'flight', populate: [{ path: 'airline' }, { path: 'origin', select: 'IATA' }, { path: 'destination', select: 'IATA' }] }).exec(function (err, bookingpop_result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Booking pop");
            console.log(bookingpop_result);
            res.render("payment/payment.ejs", { booking: bookingpop_result });
        }
    });
});

router.post('/:book_id/confirm', function (req, res) {
    var method = req.body.method

    Booking.findById(req.params.book_id).populate("contact").populate({path: 'travelers' }).populate({path: 'flight', populate: [{path: 'airline'}, {path: 'origin', select: 'IATA'}, {path: 'destination', select: 'IATA'}]  }).exec(function (err, bookingpop_result) {
        if (err) {
            console.log(err);
        } else {
                    
                    res.render("payment/payment-confirm.ejs", {booking: bookingpop_result, method})
                }     
        
    });
    
});


router.post('/:book_id/done', function (req, res) {
    var method = req.body.method

    Booking.updateOne(
        { _id: req.params.book_id },
        { $set: { paymentstatus: "payment success" } }
        , function (err, bookingUpdate) {
            if (err) {
                console.log(err);
            } else {
            }
        });

    Booking.findById(req.params.book_id).populate("contact").populate({path: 'travelers' }).populate({path: 'flight', populate: [{path: 'airline'}, {path: 'origin', select: 'IATA'}, {path: 'destination', select: 'IARA'}]  }).exec(function (err, bookingpop_result) {
        if (err) {
            console.log(err);
        } else {
                    res.render("payment/payment-done.ejs", {booking: bookingpop_result, method})
                }     
        
    });
});

module.exports = router;