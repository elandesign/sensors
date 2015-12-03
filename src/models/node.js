module.exports = function(sequelize, DataTypes) {
  var Node = sequelize.define("Node", {
    name: DataTypes.STRING
  });

  return Node;
};
