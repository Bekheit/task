import express from 'express'
import mongoose from 'mongoose'
import userRoutes from './routes/userRoutes'
import dotenv from 'dotenv'

dotenv.config();

const app = express();
app.use(express.json());

mongoose
  .connect('mongodb://localhost/db')
  .then(() => console.log('connected to db'))
  .catch(() => console.log('connect failed to db'));

app.use('api/users', userRoutes);

app.listen(3000, () => {
  console.log('started');
});