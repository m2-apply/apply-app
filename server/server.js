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

app.get('/api/user', userRouter);

// Default unknown page handler
app.use('*', (req, res) => {
  res.status(404).send('Error: Page not found.');
});

// Express error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred.' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});

module.exports = app;
