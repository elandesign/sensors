"use strict";

class EventLogger {
	log(message) {
		models.SensorEvent.create(message.attributes());
	}
}

module.exports = EventLogger
