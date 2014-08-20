var express = require('express');
var router = express.Router();


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/dokku-test');



// Create a schema for our data
var MessageSchema = new mongoose.Schema({
  message: String,
  date: Date
});

// Use the schema to register a model with MongoDb
mongoose.model('Message', MessageSchema); 
var Message = mongoose.model('Message'); 





/* GET users listing. */
router.get('/', function(req, res) {
    //res.send('respond with a resource');
  
    Message.find().sort('date', -1).execFind(function (arr, data) {
        res.send(data);
    });
  
});


router.get('/add', function(req, res) {
    var message = new Message();
    message.message = req.params.message;
    message.date = new Date();
    message.save(function () {
        res.send(req.body);
    });
});

module.exports = router;
