var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    flash = require('connect-flash'),
    methodOverride = require('method-override'),
    passport = require('passport'),
    LocalStrategy = require('passport-local');

// database schema
var User = require('./models/user');

// declare routes
var indexRoutes = require('./routes/index'),
    flightRoutes = require('./routes/flight'),
    adminRoutes = require('./routes/admin');

mongoose.connect('mongodb://localhost/AeolusTravelProject');

app.use(express.static('public'));
app.use(express.static('javascript'));

app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(express.static(__dirname + 'public'));
app.use(flash());

app.use(require('express-session')({
    secret: 'Secret is a secret.',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

// use routes
app.use('/', indexRoutes);
app.use('/admin', adminRoutes);
app.use('/flight', flightRoutes);

app.get('*', function (req, res) {
    res.send('Bad request.');
})

app.listen('3030', function (req, res) {
    console.log('Aeolus Travel Server is running');
});
