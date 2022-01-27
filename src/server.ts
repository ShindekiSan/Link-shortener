import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import authRoute from './api/auth.routes';
import linkRoute from './api/link.routes';
import redirectRoute from './api/redirect.routes';
import config from '../config/default';
// const express = require('express');
// const config = require('config');
// const mongoose = require('mongoose');

const app = express();

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', ['*']);
  next();
});

// @ts-ignore
app.use(express.json({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../app-frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../app-frontend/dist', 'index.html'));
});

app.use('/api/auth', authRoute);
app.use('/api/link', linkRoute);
app.use('/t', redirectRoute);

const PORT = config.port || 5000;

async function start(): Promise<void> {
  try {
    await mongoose.connect(config.mongoUri);
    app.listen(PORT, () => console.log(`App has been startet on port ${PORT}...`)); // eslint-disable-line
  } catch (e) {
    console.log('Server Error', JSON.stringify(e)); // eslint-disable-line
    process.exit(1);
  }
}

start();
