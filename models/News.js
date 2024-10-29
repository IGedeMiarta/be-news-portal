import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';  // Adjust path as needed

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
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,       // Pass the connection instance
    modelName: 'News', // Name the model
    tableName: 'news', // Optional: Specify table name
    timestamps: true,  // Add createdAt and updatedAt timestamps
  }
);

export default News;
