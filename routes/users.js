var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
mongoose.connect('mongodb://172.17.42.1/dokku-test');



// Create a schema for our data
var MessageSchema = new mongoose.Schema({
  message: String,
  date: Date
});

// Use the schema to register a model with MongoDb
var Message = mongoose.model('Message', MessageSchema); 





/* GET users listing. */
router.get('/', function(req, res) {
    //res.send('respond with a resource');
  
    Message.find(function (err, data) {
        if (err) return console.error(err);
        res.send(data);
    });
  
});


router.get('/add', function(req, res) {
    var message = new Message();
    message.message = req.params.message;
    message.date = new Date();
    message.save(function (err, data) {
        if (err) return console.error(err);
        res.send("Added");
    });
});

module.exports = router;
