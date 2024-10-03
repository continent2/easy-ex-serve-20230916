/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('banks', {
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
    banknameen: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    banknamenative: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    codelocal: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    codenormal: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    nation: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    urllogo: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    codebic: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'banks'
  });
};
