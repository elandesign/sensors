var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var serialport = require('serialport');
var config = require("../config/gateway.json")["serial"]
var models = require("./models")

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/nodes', function(req, res) {
  models.Node.findAll().then(function(nodes) {
    res.json(nodes);
  })
});

app.post('/nodes', function(req, res) {
  models.Node.create({name: req.body.name}).then(function(node) {
    res.json(node);
  })
})


// var SerialPort  = serialport.SerialPort;
// var portName = config.port;
// var portConfig = {
//   baudRate: config.baudRate,
//   parser: serialport.parsers.readline('\n')
// };

// // open the serial port:
// var serialPort = new SerialPort(portName, portConfig);

// serialPort.on("open", function () {
//   console.log('open');
// });

// serialPort.on('data', function(data) {
//   console.log('data received: ' + data);
// });

models.sequelize.sync().then(function () {
  var server = app.listen(3001, function () {
    console.log('Sensors listening on port %s', server.address().port);
  });
});
