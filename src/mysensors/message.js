"use strict";

var consts = require("./constants");
var models = require("../models");

class Message {
  constructor(deviceID, sensorID, messageType, ack, subType, payload) {
    this.deviceID = parseInt(deviceID);
    this.sensorID = parseInt(sensorID);
    this.messageType = parseInt(messageType);
    this.ack = parseInt(ack);
    this.subType = parseInt(subType);
    this.payload = payload;
  }

  isSensorReading() {
    return this.messageType == consts.MESSAGE_TYPES.set
  }

  isDevicePresentation() {
    return this.messageType == consts.MESSAGE_TYPES.presentation &&
      this.sensorID == 255 &&
      this.subType == consts.PRESENTATION_TYPES.S_ARDUINO_NODE
  }

  isSensorPresentation() {
    return this.messageType == consts.MESSAGE_TYPES.presentation &&
      this.sensorID != 255
  }

  isInternal() {
    return this.messageType == consts.MESSAGE_TYPES.internal
  }

  process() {
    if(this.isDevicePresentation()) {
      models.Device.upsert({id: this.deviceID, firmwareVersion: this.payload});
    }
    else if(this.isSensorPresentation()) {
      models.Sensor.upsert({deviceID: this.deviceID, sensorID: this.sensorID, type: this.subType})
    }
    else if(this.isInternal()) {
      switch(this.subType) {
        case consts.INTERNAL_TYPES.I_SKETCH_NAME:
          models.Device.upsert({id: this.deviceID, sketchName: this.payload});
          break;
        case consts.INTERNAL_TYPES.I_SKETCH_VERSION:
          models.Device.upsert({id: this.deviceID, sketchVersion: this.payload});
          break;
      }
    }
    else if(this.isSensorReading()) {
      models.SensorReading.create({deviceID: this.deviceID, sensorID: this.sensorID, type: this.subType, payload: this.payload});
    }
  }
}

module.exports = Message;
