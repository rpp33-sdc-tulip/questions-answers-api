const { Client } = require('pg');
const dbconfig = require('../config');

// create new database connection
const db = new Client(dbconfig.cn);
db.connect((err, res) => {
  if (err) {
    console.log('ERROR', err);
  }
  console.log('RESPONSE', res);
});

db
  // build out initial db
  .query(
    `CREATE TABLE questions_temp(
    id varchar,
    product_id varchar,
    question_body varchar,
    date varchar,
    asker_name varchar,
    asker_email varchar,
    reported varchar,
    question_helpfulness varchar,
    PRIMARY KEY(id)
  );

  CREATE TABLE answers_temp(
    id varchar,
    question_id varchar,
    body varchar,
    date varchar,
    answerer_name varchar,
    asker_email varchar,
    reported varchar,
    helpfulness varchar
  );

  CREATE TABLE photos_temp(
    id varchar,
    answer_id varchar,
    photo_url varchar,
    PRIMARY KEY(id)
  );`,
  )
  .then((res) => {
    console.log(res);
    db.end();
  })
  .catch((err) => {
    console.log(err);
    db.end();
  });
