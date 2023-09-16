/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('verifycode', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER(11).UNSIGNED,
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
    code: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    receiver: {
      type: DataTypes.STRING(100),
      allowNull: true,
      comment: 'receiving phone or email'
    },
    contents: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    expiry: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'verifycode'
  });
};
