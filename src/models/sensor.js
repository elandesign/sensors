module.exports = function(sequelize, DataTypes) {
  var Sensor = sequelize.define("Sensor", {
    deviceID: DataTypes.INTEGER,
    sensorID: DataTypes.INTEGER,
    name: DataTypes.STRING,
    type: DataTypes.INTEGER
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["deviceID", "sensorID"]
      }
    ]
  });

  return Sensor;
};
