var express = require('express'),
    router  = express.Router(),
    User    = require('../models/user'),
    Booking = require('../models/booking'),
    passport=  require('passport');

router.get('/', function(req, res){
    res.redirect('/flight');
});

router.get('/register', function(req, res){
    res.render('./account/register.ejs');
});

router.post('/register', function(req, res){
    var email       = req.body.email,
        username    = req.body.username,
        password    = req.body.password,
        confirmPassword  = req.body.confirmPassword,
        title       = req.body.title,
        firstname   = req.body.firstname,
        lastname    = req.body.lastname,
        tel         = req.body.tel;
    
    // Check password matching
    if(password !== confirmPassword){
        console.log("Password do not match")
        req.flash('error', 'Password do not match.')
        return res.redirect('/register');
    }
    
    var newUser = new User({
        email:  email,
        username:   username,
        title:  title,
        firstname:  firstname,
        lastname:   lastname,
        tel:    tel,
        mileage:    "0"
    });
    
    /*
    if(req.body.adminCode === 'admincode'){
        newUser.isAdmin = true;
    }
    */

    User.register(newUser, req.body.password, function(err, user){
        if(err) {
            console.log(err);
            req.flash('error', 'This username has already been registed');
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function(){
            req.flash('success', 'Register successed, please log in to Aeolus Travel!');
            res.redirect('/login');
        });
    });
});

router.get('/login', function(req,res){
    res.render('./account/login.ejs');
});

router.post('/login', passport.authenticate('local', {
        successFlash: true,
        failureFlash: true,
        failureFlash: 'Invalid username or password',
        failureRedirect: '/login'
    }),function(req,res){
        if(req.user.isAdmin === true){

            req.flash('success', 'Welcome Admin ' + req.user.firstname);
            res.redirect('/admin');
        }
        else {

            req.flash('success', 'Welcome to Aeolus Travel! ' + req.user.firstname);
            res.redirect('/flight');
        }
    }
);

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/flight');
});

router.get('/user/profile',isLoggedIn , function(req, res){
    res.render('user/profile.ejs');
});

router.get('/user/booking', isLoggedIn , function(req,res){

    var id = req.user._id;
    var username = req.user.firstname;
    var booking_query = {
        booker: {
            id: id,
            username: username
        }
    }
    
    Booking.find(booking_query).populate("contact").populate({ path: 'flight', populate: [{ path: 'airline' }, { path: 'origin', select: 'IATA' }, { path: 'destination', select: 'IATA' }] }).exec(function(err, booking_result){
        if(err){
           console.log(err);
        } else {
            console.log(booking_result)
            res.render("user/booking.ejs", {bookings: booking_result})
        }
    });
    
});

router.get('/check-book', function(req,res){

    if(req.isAuthenticated()){
        res.redirect('/user/booking')
    } else {
        res.render("user/booking-check.ejs")
    }
    
});

router.post('/check-book/search', function(req,res){

    var bookingID = req.body.bookingID;

    Booking.findOne( {bookingID:bookingID} ).populate("contact").populate({ path: 'flight', populate: [{ path: 'airline' }, { path: 'origin', select: 'IATA' }, { path: 'destination', select: 'IATA' }] }).exec(function(err, booking_result){
        if(err){
           console.log(err);
        } else {

            if (booking_result == null) {
                req.flash('error', 'Booking not found please try again.')
                res.redirect('/check-book');
            }
            res.render("user/booking-check-result.ejs", {booking: booking_result})
        }
    });

    
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to log in frist.');
    res.redirect('/login');
}



module.exports = router;