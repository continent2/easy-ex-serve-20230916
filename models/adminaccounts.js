/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('adminaccounts', {
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
    type: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: 'FIAT,CRYPTO'
    },
    bankcode: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    bankname: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: 'eg, shinhan or ETH'
    },
    number: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: 'eg, 123-456-7890'
    },
    holder: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: 'hong gildong'
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 1
    },
    nation: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: 'eg, KR'
    },
    isdefault: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    urllogo: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    symbol: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    nettype: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: 'mainnet,testnet'
    },
    typecf: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: 'C:crypto, F:fiat'
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'adminaccounts'
  });
};
