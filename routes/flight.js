var express = require('express'),
    router = express.Router();

router.get('/', function(req, res){
    res.render('./flight/flight.ejs');
});

module.exports = router;