import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';  // Adjust path as needed

class User extends Model {}

User.init(
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
  },
  {
    sequelize,       // Pass the connection instance
    modelName: 'User', // Name the model
    tableName: 'users', // Optional: Specify table name
    timestamps: true,  // Add createdAt and updatedAt timestamps
  }
);

export default User;
