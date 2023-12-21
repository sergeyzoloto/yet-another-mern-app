import express, { json, request, response } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import User from './models/User.js';

import { config } from 'dotenv';
config();

import bcryptjs from 'bcryptjs';
const salt = bcryptjs.genSaltSync();
import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
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

app.post('/login', async (request, response) => {
  const { username, password } = request.body;
  const userDoc = await User.findOne({ username });
  const passwordCheck = bcryptjs.compareSync(password, userDoc.password);
  if (passwordCheck) {
    // logged in
    jwt.sign({ username, id: userDoc._id }, secret, {}, (error, token) => {
      if (error) throw error;
      response.cookie('token', token).json('ok');
    });
  } else {
    response.status(400).json('wrong credentials');
  }
});

app.listen(port);
