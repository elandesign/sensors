module.exports = function(sequelize, DataTypes) {
  var Device = sequelize.define("Device", {
    name: DataTypes.STRING,
    firmwareVersion: DataTypes.STRING,
    sketchName: DataTypes.STRING,
    sketchVersion: DataTypes.STRING
  });

  return Device;
};
