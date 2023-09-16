/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('tickers', {
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
    quote: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    base: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    value: {
      type: DataTypes.STRING(20),
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
    typestr: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: 'FC:1 , CF:2'
    },
    source: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'tickers'
  });
};
