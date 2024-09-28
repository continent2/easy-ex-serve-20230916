/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('transactionsoutside20220101', {
    no: {
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
    removed: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    logIndex: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    transactionIndex: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    transactionHash: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    blockHash: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    blockNumber: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    address: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    data: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    topics: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    id: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'transactionsoutside20220101'
  });
};
