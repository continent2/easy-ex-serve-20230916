/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('useraccounts', {
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
    username: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    privatekey: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    nettype: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    currentBlockNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 10000000
    },
    firstUsedBlockNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 11000000
    },
    useruuid: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 1
    },
    currency: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    typecf: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    symbol: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    balancefloat: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    balancestr: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    convvalue: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    convsymbol: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    urllogo: {
      type: DataTypes.STRING(10),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'useraccounts'
  });
};
