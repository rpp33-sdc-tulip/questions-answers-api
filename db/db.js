const { Client } = require('pg');
const dbconfig = require('../config');

// create new db connection
const db = new Client(dbconfig.cn);
db.connect((err, res) => {
  if (err) {
    console.log('ERROR', err);
  }
  // console.log('RESPONSE', res);
});

// get answers db query
const getAnswers = (params, callback) => {
  const id = params.question_id;
  db
    // Need to limit results based on params
    .query(`SELECT * FROM answers WHERE "Questions_id" = ${id};`)
    .then((res) => {
      // console.log(res.rows);
      const data = {
        question: id,
        page: parseInt(params.page, 10),
        count: parseInt(params.count, 10),
        results: [],
      };
      res.rows.forEach((row) => {
        const formattedResult = {
          answer_id: parseInt(row.id, 10),
          body: row.body,
          date: new Date(parseInt(row.date, 10) / 1000),
          answerer_name: row.answerer_name,
          helpfulness: row.helpfulness,
          // Need to make Photos query here
          photos: [],
        };
        data.results.push(formattedResult);
      });
      // console.log('DATA', data);
      callback(null, data);
    })
    .catch((err) => {
      callback(err, null);
      console.log('ERROR: ', err);
    });
};

const getQuestions = (params, callback) => {
  // query db for questions
  const finalData = {
    product_id: params.product_id,
    results: [],
  };
  db
    .query(`SELECT * FROM questions WHERE product_id = ${params.product_id}`)
    .then((questionResponse) => {
      questionResponse.rows.forEach((question, index, rows) => {
        const questionObject = {
          question_id: question.id,
          question_body: question.question_body,
          question_date: new Date(parseInt(question.date, 10) / 1000),
          asker_name: question.asker_name,
          question_helpfulness: question.question_helpfulness,
          // Hardcoded, need to fix *********** FIX ME **********
          reported: false,
          answers: {},
        };
        finalData.results.push(questionObject);
        db
          .query(`SELECT * FROM answers WHERE "Questions_id" = ${question.id};`)
          .then((answerResponse) => {
            answerResponse.rows.forEach((answer) => {
              questionObject.answers[answer.id] = {
                id: answer.id,
                body: answer.body,
                date: new Date(parseInt(answer.date, 10) / 1000),
                answerer_name: answer.answerer_name,
                helpfulness: answer.helpfulness,
                // Need to query photos ********** FIX ME *****************
                photos: [],
              };
            });
            if (index === rows.length - 1) {
              callback(null, finalData);
            }
          });
      });
    })
    .catch((err) => {
      callback(err, null);
    });
};

module.exports.getAnswers = getAnswers;
module.exports.getQuestions = getQuestions;
