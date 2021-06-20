var express = require('express'),
    router = express.Router(),
    User    = require('../models/user'),
    passport =  require('passport');

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
            req.flash('success', 'Welcome to DogeAir!' + user.firstname);
            res.redirect('/login');
        });
    });
});

router.get('/login', function(req,res){
    res.render('./account/login.ejs');
});

router.post('/login',
    passport.authenticate('local',
    {
        successFlash: true,
        failureFlash: true,
        failureFlash: 'Invalid username or password',
        failureRedirect: '/login'
    }),function(req,res){
        if(req.user.isAdmin){
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

router.get('/user/profile',function(req, res){
    res.render('user/profile.ejs');
});

router.get('/user/booking',function(req, res){
    res.render('user/booking.ejs');
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash('error', 'You need to log in frist.')
    res.redirect('/login');
}


module.exports = router;