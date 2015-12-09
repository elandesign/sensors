var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var models = require("./models");
var Gateway = require("./mysensors/serialGateway.js");

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/devices', function(req, res) {
  models.Device.findAll().then(function(devices) {
    res.json(devices);
  })
});

app.get('/devices/:deviceID/:sensorID', function(req, res){
	models.Reading.findAll({
		where: {
			deviceID: req.params.deviceID,
      sensorID: req.params.sensorID
		}
	}).then(function(readings){
		res.json(readings);
	});
});

var config = require("../config/gateway.json")["serial"]
new Gateway(config.port, config.baudRate)

models.sequelize.sync().then(function () {
  var server = app.listen(3001, function () {
    console.log('Sensors listening on port %s', server.address().port);
  });
});
