/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tokens', {
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
    name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    symbol: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    decimals: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    writer: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 1
    },
    nettype: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    istoken: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 1
    },
    urllogo: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    isdefault: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    deployer: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    isadminadded: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      comment: 'registered by admin'
    },
    totalsupply: {
      type: DataTypes.STRING(60),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tokens'
  });
};
