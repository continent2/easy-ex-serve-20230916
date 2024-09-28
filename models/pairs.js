/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('pairs', {
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
    fromamount: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    toamount: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    exchangerate: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    fixedrate: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    isusedfixedrate: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    typestr: {
      type: DataTypes.STRING(20),
      allowNull: true,
      comment: 'FC:1 , CF:2'
    },
    uuid: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    tickersymbol: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    urllogobase: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    urllogoquote: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    minfromamount: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    fromamountprecision: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    toamountprecision: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    frombasenet: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    tobasenet: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'pairs'
  });
};
