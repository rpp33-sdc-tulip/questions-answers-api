const { Client } = require('pg');
const dbconfig = require('../config');

// create new db connection
const db = new Client(dbconfig.cn);
db.connect((err, res) => {
  if (err) {
    console.log('ERROR', err);
  }
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
          date: new Date(parseInt(row.date)),
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

// Could I use joins and get all data with one query?
// Subqueries
// GroubBy
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
          question_date: new Date(parseInt(question.date)),
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
                date: new Date(parseInt(answer.date)),
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

const addQuestion = (question, callback) => {
  const timestamp = new Date().getTime();
  db
    .query(`INSERT INTO questions(product_id, question_body, date, asker_name, asker_email, reported, question_helpfulness)
    VALUES (${question.product_id}, '${question.body}', '${timestamp}', '${question.name}', '${question.email}', 0, 0)`)
    .then(() => { callback(null); })
    .catch((err) => { callback(err); });
};

const addAnswer = (questionId, answer, callback) => {
  const timestamp = new Date().getTime();
  db
    .query(`INSERT INTO answers("Questions_id", body, date, answerer_name, asker_email, reported, helpfulness)
    VALUES (${questionId}, '${answer.body}', '${timestamp}', '${answer.name}', '${answer.email}', 0, 0)`)
    .then(() => { callback(null); })
    .catch((err) => { callback(err); });
};

const voteQuestionHelpful = (questionId, callback) => {
  db
    .query(`UPDATE questions SET question_helpfulness = question_helpfulness + 1
    WHERE id = ${questionId}`)
    .then(() => { callback(null); })
    .catch((err) => { callback(err); });
};

const reportQuestion = (questionId, callback) => {
  db
    .query(`UPDATE questions SET reported = 1
    WHERE id = ${questionId}`)
    .then(() => { callback(null); })
    .catch((err) => { callback(err); });
};

const voteAnswerHelpful = (answerId, callback) => {
  db
    .query(`UPDATE answers SET helpfulness = helpfulness + 1
    WHERE id = ${answerId}`)
    .then(() => { callback(null); })
    .catch((err) => { callback(err); });
};

const reportAnswer = (answerId, callback) => {
  db
    .query(`UPDATE answers SET reported = 1
    WHERE id = ${answerId}`)
    .then(() => { callback(null); })
    .catch((err) => { callback(err); });
};

module.exports.getAnswers = getAnswers;
module.exports.getQuestions = getQuestions;
module.exports.voteQuestionHelpful = voteQuestionHelpful;
module.exports.reportQuestion = reportQuestion;
module.exports.voteAnswerHelpful = voteAnswerHelpful;
module.exports.reportAnswer = reportAnswer;
module.exports.addQuestion = addQuestion;
module.exports.addAnswer = addAnswer;
