import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 
import NewsCategory from './NewsCategory.js';

class News extends Model {}

News.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,      
    modelName: 'News', 
    tableName: 'News', 
    timestamps: true,  
  }
);
News.belongsTo(NewsCategory, { foreignKey: 'categoryId' });
NewsCategory.hasMany(News, { foreignKey: 'categoryId' });

export default News;
