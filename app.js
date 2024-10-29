import express from 'express';
import db from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Express with Sequelize and MySQL!');
});

db.sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch((err) => console.log('Error: ' + err));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
