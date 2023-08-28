const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const appRoot = require('app-root-path');
const paths = appRoot + '/paths';
const app = express();

// rounters

//parsing chunks
app.use(express.json());

// router to handle main app
app.get('/', (req, res) => {
  res.json(path.join(paths.client, 'client'));
});

//  listening
