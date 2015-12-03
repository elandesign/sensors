var express = require('express');
var app = express();
var serialport = require('serialport');
var config = require("../config/gateway.json")["serial"]
var models = require("./models")

app.use(express.static('public'));

app.get('/nodes', function (req, res) {
  models.Node.findAll().then(function(nodes) {
    res.send(nodes);
  })
});


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
  var server = app.listen(3000, function () {
    console.log('Example app listening on port %s', server.address().port);
  });
});
