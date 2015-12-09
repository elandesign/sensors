module.exports = function(sequelize, DataTypes) {
  var SensorReading = sequelize.define("SensorReading", {
    deviceID: DataTypes.INTEGER,
    sensorID: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    payload: DataTypes.STRING
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["deviceID", "sensorID", "createdAt"]
      }
    ]
  });

  return SensorReading;
};
