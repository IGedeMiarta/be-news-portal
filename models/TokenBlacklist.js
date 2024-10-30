import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js'; 

class TokenBlacklist extends Model {}

TokenBlacklist.init(
  {
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    expires_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    refreshToken: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
  },
  {
    sequelize,       
    modelName: 'TokenBlacklist', 
    tableName: 'TokenBlacklists', 
    timestamps: true,  
  }
);

export default TokenBlacklist;
