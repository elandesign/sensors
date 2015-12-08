"use strict";

var models = require("../models");

class EventLogger {
	constructor(raw) {
		var data = raw.split(";");
		this.nodeID = data[0];
		this.sensorID = data[1];
		this.messageType = data[2];
		this.ack = data[3];
		this.subType = data[4];
		this.payload = data[5];
		console.log(this);
	}

	log() {
		models.SensorEvent.create({
			nodeID: this.nodeID,
			sensorID: this.sensorID,
			messageType: this.messageType,
			subType: this.subType,
			payload: this.payload
		});
	}
}

module.exports = EventLogger
