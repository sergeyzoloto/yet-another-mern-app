import express, { json } from 'express';
import cors from 'cors';
import { connect } from 'mongoose';
import User from './models/User.js';
import Post from './models/Post.js';
import fs from 'fs';

// Handling files
import multer from 'multer';
const uploadMiddleware = multer({ dest: 'uploads/' });

import { config } from 'dotenv';
config();

import bcryptjs from 'bcryptjs';
const salt = bcryptjs.genSaltSync();
import jwt from 'jsonwebtoken';
const secret = process.env.JWT_SECRET;
import cookieParser from 'cookie-parser';

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));

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
      response.cookie('token', token).json({
        id: userDoc._id,
        username,
      });
    });
  } else {
    response.status(400).json('wrong credentials');
  }
});

app.get('/profile', (request, response) => {
  const { token } = request.cookies;
  jwt.verify(token, secret, {}, (error, info) => {
    if (error) throw error;
    response.json(info);
  });
});

app.get('/logout', (request, response) => {
  response.cookie('token', '').json('ok');
});

app.post(
  '/post',
  uploadMiddleware.single('file'),
  async (request, response) => {
    const { originalname, path } = request.file;
    const parts = originalname.split('.');
    const extension = parts[parts.length - 1];
    const newPath = path + '.' + extension;

    fs.renameSync(path, newPath);

    const { token } = request.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
      if (err) throw err;
      const { title, summary, content } = request.body;
      const postDoc = await Post.create({
        title,
        summary,
        content,
        cover: newPath,
        author: info.id,
      });
      response.json(postDoc);
    });
  },
);

app.get('/post', async (request, response) => {
  response.json(
    await Post.find()
      .populate('author', ['username']) // populate() method
      // is used to replace the user ObjectId field
      // with the whole document consisting of all the user data
      .sort({ createdAt: -1 })
      .limit(20),
  );
});

app.get('/post/:id', async (request, response) => {
  const { id } = request.params;
  const postDoc = await Post.findById(id).populate('author', ['username']);
  response.json(postDoc);
});

app.listen(port);
