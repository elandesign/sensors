"use strict";

var Message = require("./message");
var EventLogger = require("./eventLogger");
var serial = require('serialport');
var SerialPort = serial.SerialPort;

class SerialGateway {
  constructor(device, baudRate) {
    this.device = device;
    this.config = {
      baudRate: baudRate,
      parser: serial.parsers.readline('\n')
    }
    this.logger = new EventLogger();
    this.connect()
  }

  connect() {
    this.port = new SerialPort(this.device, this.config);
    this.port.on("open", this.onConnect.bind(this));
    this.port.on("data", this.onMessage.bind(this));
    this.port.on("error", this.onError.bind(this));
  }

  onConnect() {
    console.log(`Connected to serial gateway ${this.device}`);
  }

  onMessage(raw) {
    new Message(...raw.split(";")).process();
  }

  onError(err) {
    console.log("Serial gateway error, reconnecting");
    this.connect();
  }
}

module.exports = SerialGateway
