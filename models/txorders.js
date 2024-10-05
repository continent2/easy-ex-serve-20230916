/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('txorders', {
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
      comment: '0:waiting,1:ok,2:fail,3:expired,4:canceled'
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
    nettype: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    expirystr: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    timestampunix: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    timestamppaid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    timedeliverdue: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    issettled: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    txhashpayout: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    statusint: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 0
    },
    refundaddress: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    quote: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    base: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    expirydur: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    fromamount: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    toamount: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    bankname: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    bankaccount: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    banknation: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    bankaccountholder: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    banksender: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    addressfinal: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    type: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    requestdepositconfirm: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    feeamountunit: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    depositamount: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    timestampdeposit: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    exchangerate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    withdrawaccount: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    wthdrawamount: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    writername: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    writeruuid: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    writerid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    withdrawtypestr: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    statusstr: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    durationdeliver: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    isdeleted: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 0
    },
    timestampdeliver: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    timestrdeliver: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    receivebank: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    basenet: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    fromdata: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'sender data'
    },
    todata: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: 'receiver data'
    },
    quotesignature: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    symbol: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'txorders'
  });
};
