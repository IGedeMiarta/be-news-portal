import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 

class NewsCategory extends Model {}

NewsCategory.init(
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,       
    modelName: 'NewsCategory', 
    tableName: 'NewsCategories', 
    timestamps: true,  
  }
);

export default NewsCategory;
