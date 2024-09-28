/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('settings', {
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
    key_: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    value_: {
      type: DataTypes.STRING(2000),
      allowNull: true
    },
    subkey_: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    data: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    units: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    min: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    max: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    group_: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'settings'
  });
};
