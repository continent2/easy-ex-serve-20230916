/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('logactions', {
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
    unixtime: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    type: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    typestr: {
      type: DataTypes.STRING(40),
      allowNull: true,
      comment: ' 0:join , 1:login, 2:logout 3:change-pw , 4:change-nickname '
    },
    ipaddress: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'logactions'
  });
};
