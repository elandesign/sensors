module.exports = function(sequelize, DataTypes) {
  var SensorEvent = sequelize.define("SensorEvent", {
    nodeID: DataTypes.INTEGER,
    sensorID: DataTypes.INTEGER,
    messageType: DataTypes.INTEGER,
    subType: DataTypes.INTEGER,
    payload: DataTypes.STRING
  });

  return SensorEvent;
};
