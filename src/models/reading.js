module.exports = function(sequelize, DataTypes) {
  var Reading = sequelize.define("Reading", {
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

  return Reading;
};
