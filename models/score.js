'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class score extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      score.belongsTo(models.students, { as : "Student", foreignKey : "studentId"})
    }
  };
  score.init({
    math: DataTypes.INTEGER,
    physics: DataTypes.INTEGER,
    algoritm: DataTypes.INTEGER,
    programming: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER,
    scoreId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'score',
  });
  return score;
};