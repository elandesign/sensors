module.exports = function(sequelize, DataTypes) {
  var Sensor = sequelize.define("Sensor", {
    deviceID: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    sensorID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: DataTypes.STRING,
    type: DataTypes.INTEGER
  });

  return Sensor;
};
