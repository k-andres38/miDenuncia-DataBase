'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      photo.belongsTo(models.request,{
        foreignKey:"request_id"
      })
      photo.hasOne(models.report,{
        foreignKey:"photo_id"
      })
    }
  }
  photo.init({
    url:DataTypes.TEXT,
    request_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'photo',
    paranoid: true,
  });
  return photo;
};