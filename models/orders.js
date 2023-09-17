/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('orders', {
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
    uuid: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    price: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    priceunit: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    item: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    itemuuid: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    priceraw: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    pricedisp: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    feeamount: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    feerate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    feerateunit: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    receiveaddress: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    typecode: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      comment: '100 : create, 200 : trade/buy'
    },
    typestr: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    auxdata: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    txhash: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      comment: '0:waiting,1:ok,2:fail,3:expired'
    },
    expiry: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    privatekey: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    useruuid: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    reqprefix: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    reqsuffix: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    nettype: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    expirystr: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    reqpatternlen: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    timestampunix: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    minermacaddress: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    timestamppaid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    timestampdeliverpromised: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    issettled: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    timeinsec: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    txhashpayout: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    statusint: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      defaultValue: -1
    },
    refundaddress: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    timetoforcepurge: {
      type: DataTypes.BIGINT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'orders'
  });
};
