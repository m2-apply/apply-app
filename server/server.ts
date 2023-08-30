import path from 'path';
import express from 'express';
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');

const axios = require('axios');

import userRouter from './src/routes/userRouter';
const app = express();

const PORT = 3001;
// rounters

// parsing chunks
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: 'http://localhost:8080' }));
app.use(bodyParser.json());

app.use(express.static('./dist'));

// router to handle main app
app.get('/', (req, res) => {
  res.send('Landing Page!');
});

// api for LinkedOAuth
app.get('/api/user', userRouter);
// api for subscriber functions
// app.get('/api/subList', subListRouter);
// api for filters
// app.get('/api/filters', filtersRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

// // Default unknown page handler
// app.use('*', (req, res) => {
//   res.status(404).send('Error: Page not found.');
// });

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

// testing route for login
app.post('/api/login', (req, res) => {
  console.log('req.body: ', req.body);
  const { username, password, picture } = req.body;
  return res.status(200).json({ message: 'success' });
});


export default app;
