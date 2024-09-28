/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('adcontents', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    createdat: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('current_timestamp')
    },
    updatedat: {
      type: DataTypes.DATE,
      allowNull: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    textbody: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    urlimage: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    writer: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    typestr: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: '1:fat,2:tall'
    }
  }, {
    sequelize,
    tableName: 'adcontents'
  });
};
