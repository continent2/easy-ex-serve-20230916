/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pushnotifies', {
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
    amount: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    currency: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      comment: ' 0 :DEPOSIT , 1: WITHDRAW'
    },
    typestr: {
      type: DataTypes.STRING(40),
      allowNull: true,
      comment: ' 0 :DEPOSIT , 1: WITHDRAW'
    },
    txhash: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    from_: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    to_: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    nettype: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    read_: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 0
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    contentbody: {
      type: DataTypes.STRING(400),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pushnotifies'
  });
};
