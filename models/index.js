import { Sequelize } from 'sequelize';
import config from '../config/config.js';

const { database, username, password, host, dialect } = config[process.env.NODE_ENV || 'development'];
const sequelize = new Sequelize(database, username, password, { host, dialect });

const db = {
  sequelize,
  Sequelize,
};

export default db;
