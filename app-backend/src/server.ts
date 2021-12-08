import express from 'express';
import config from 'config';
import mongoose from 'mongoose';
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

app.use('/api/auth', require('./api/auth.routes'));
app.use('/api/link', require('./api/link.routes'));
app.use('/t', require('./api/redirect.routes'));

const PORT = config.get('port') || 5000;

async function start() {
	try {
		await mongoose.connect(config.get('mongoUri'));
		app.listen(PORT, () => console.log(`App has been startet on port ${PORT}...`));
	} catch (e) {
		console.log('Server Error', JSON.stringify(e));
		process.exit(1);
	}
}

start();
