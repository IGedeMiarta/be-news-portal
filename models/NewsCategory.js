import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';  // Adjust path as needed

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
    sequelize,       // Pass the connection instance
    modelName: 'NewsCategory', // Name the model
    tableName: 'news_categories', // Optional: Specify table name
    timestamps: true,  // Add createdAt and updatedAt timestamps
  }
);

export default NewsCategory;
