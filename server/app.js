const express = require('express');
const app = express();
const cors = require('cors');
const db = require('../db/db');

app.use(cors());

app.get('/', (req, res) => {
  res.send('SDC');
});

app.get('/qa/questions', (req, res) => {
  // console.log(req.query);
  db.getQuestions(req.query, (err, data) => {
    // console.log('data in server', data);
    if (err) {
      console.log('ERROR with get request: ', err);
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/qa/questions/:question_id/answers', (req, res) => {
  // console.log(req.query);
  db.getAnswers(req.query, (err, data) => {
    // console.log('data in server', data);
    if (err) {
      console.log('ERROR with get request: ', err);
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.put('/qa/questions/:question_id/helpful', (req, res) => {
  db.voteQuestionHelpful(req.params.question_id, (err) => {
    if (err) {
      res.status(400).end();
    } else {
      res.status(204).end();
    }
  });
});

app.put('/qa/questions/:question_id/report', (req, res) => {
  db.reportQuestion(req.params.question_id, (err) => {
    if (err) {
      res.status(400).end();
    } else {
      res.status(204).end();
    }
  });
});

app.put('/qa/answers/:answer_id/helpful', (req, res) => {
  db.voteAnswerHelpful(req.params.answer_id, (err) => {
    if (err) {
      res.status(400).end();
    } else {
      res.status(204).end();
    }
  });
});

app.put('/qa/answers/:answer_id/report', (req, res) => {
  db.reportAnswer(req.params.answer_id, (err) => {
    if (err) {
      res.status(400).end();
    } else {
      res.status(204).end();
    }
  });
});

module.exports = app;
