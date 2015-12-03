var express = require('express');
var app = express();
var serialport = require('serialport');
var config = require("../config/gateway.json")["serial"]

app.use(express.static('public'));

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });


var SerialPort  = serialport.SerialPort;
var portName = config.port;
var portConfig = {
  baudRate: config.baudRate,
  parser: serialport.parsers.readline('\n')
};

// open the serial port:
var serialPort = new SerialPort(portName, portConfig);

serialPort.on("open", function () {
  console.log('open');
});

serialPort.on('data', function(data) {
  console.log('data received: ' + data);
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
