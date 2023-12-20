import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import User from './models/User.js';
import { config } from 'dotenv';

import bcryptjs from 'bcryptjs';
const salt = bcryptjs.genSaltSync();

config();

const app = express();
app.use(cors());
app.use(json());

// The environment should set the port
const port = process.env.PORT;

connect(process.env.MONGODB_URL);

app.post('/register', async (request, response) => {
  const { username, password } = request.body;
  try {
    const userDoc = await User.create({
      username,
      password: bcryptjs.hashSync(password, salt),
    });
    response.json(userDoc);
  } catch (error) {
    response.status(400).json(error);
  }
});

app.listen(port);
