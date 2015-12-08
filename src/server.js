var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var models = require("./models");
var Gateway = require("./mysensors/serialGateway.js");

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/nodes', function(req, res) {
  models.Node.findAll().then(function(nodes) {
    res.json(nodes);
  })
});

app.get('/nodes/:nodeID', function(req, res){
	models.SensorEvent.findAll({
		where: {
			nodeID: req.params.nodeID
		}
	}).then(function(events){
		res.json(events);
	});
});

app.post('/nodes', function(req, res) {
  models.Node.create({name: req.body.name}).then(function(node) {
    res.json(node);
  })
})

var config = require("../config/gateway.json")["serial"]
new Gateway(config.port, config.baudRate)

models.sequelize.sync().then(function () {
  var server = app.listen(3001, function () {
    console.log('Sensors listening on port %s', server.address().port);
  });
});
