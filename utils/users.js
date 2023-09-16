/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
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
    address: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    ip: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    pw: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    pwhash: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    level: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    username: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    active: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 1
    },
    email: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    nickname: {
      type: DataTypes.STRING(60),
      allowNull: true
    },
    receiveemailnews: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 0
    },
    referercode: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    myreferercode: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    icanwithdraw: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 0
    },
    useragent: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    icanlogin: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: 1
    },
    lastactive: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users'
  });
};
