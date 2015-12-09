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

  isSet() {
    return this.messageType == consts.MESSAGE_TYPES.set
  }

  isPresentation() {
    return this.messageType == consts.MESSAGE_TYPES.presentation
  }

  isDevice() {
    return this.sensorID == 255 && this.subType == consts.PRESENTATION_TYPES.S_ARDUINO_NODE
  }

  isSensor() {
    return this.sensorID != 255
  }

  isInternal() {
    return this.messageType == consts.MESSAGE_TYPES.internal
  }

  process() {
    if(this.isPresentation()) {
      if(this.isDevice()) {
        models.Device.upsert({id: this.deviceID, firmwareVersion: this.payload});
      }
      else if(this.isSensor()) {
        models.Sensor.upsert({deviceID: this.deviceID, sensorID: this.sensorID, type: this.subType})
      }
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
    else if(this.isSet()) {
      models.Reading.create({deviceID: this.deviceID, sensorID: this.sensorID, type: this.subType, payload: this.payload});
    }
  }
}

module.exports = Message;
