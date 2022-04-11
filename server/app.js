const express = require('express');

const app = express();
const port = 8080;
const db = require('../db/db');

// app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/', (req, res) => {
  res.send('SDC');
});

app.get('/qa/questions', (req, res) => {
  console.log(req.query);
  db.getQuestions(req.query, (err, data) => {
    console.log('data in server', data);
    res.status(200).send(data);
    console.log('data in server', data);
    if (err) {
      console.log('ERROR with get request: ', err);
      res.status(500).send(err);
    } else {
      res.status(500).send(data);
    }
  });
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  console.log(req.query);
  db.getAnswers(req.query, (err, data) => {
    console.log('data in server', data);
    if (err) {
      console.log('ERROR with get request: ', err);
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = port;
