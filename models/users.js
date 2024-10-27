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
    },
    countincrements: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: 0
    },
    countdecrements: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      allowNull: true,
      defaultValue: 0
    },
    dob: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    dobunix: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    phonenumber: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    realname: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    uuid: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    nettype: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    usernamehash: {
      type: DataTypes.STRING(512),
      allowNull: true
    },
    note: {
      type: DataTypes.STRING(1000),
      allowNull: true
    },
    preferrednetwork: {
      type: DataTypes.STRING(40),
      allowNull: true
    },
    useruuid: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    urlimage: {
      type: DataTypes.STRING(400),
      allowNull: true
    },
    phonecountrycode2letter: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    phonenationalnumber: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    language: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    isskipcreatetutorial: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    socialid: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    socialprovider: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    issocial: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    parentid: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    parentuuid: {
      type: DataTypes.STRING(80),
      allowNull: true
    },
    uselevel: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    prefsymbol: {
      type: DataTypes.STRING(25),
      allowNull: true
    },
    preferredcurrency: {
      type: DataTypes.STRING(25),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'users'
  });
};
