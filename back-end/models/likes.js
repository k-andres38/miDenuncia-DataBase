'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.likes,{
       
          foreignKey:"user_id"
        })

        user.hasOne(models.reports,{
       
          foreignKey:"likes_id "
        })
        
     
    }
  }
  likes.init({
    like: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
   
  }, {
    sequelize,
    modelName: 'likes',
  });
  return likes;
};