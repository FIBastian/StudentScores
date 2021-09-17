'use strict';
const {
  Model, STRING
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class students extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      students.hasMany(models.score, { as: "Summary", foreignKey: "scoreId" })
    }
  };
  students.init({
    name: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    address: DataTypes.STRING,
    photo: DataTypes.STRING,
    scoreId: DataTypes.INTEGER,
    studentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'students',
  });
  return students;
};