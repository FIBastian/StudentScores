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
      students.hasMany(models.score, { as: "Summary", foreignKey: "studentId" })
    }
  };
  students.init({
    name: DataTypes.STRING,
    dob: DataTypes.STRING,
    address: DataTypes.STRING,
    photo: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'students',
  });
  return students;
};