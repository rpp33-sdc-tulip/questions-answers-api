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
    `CREATE TABLE questions(
    id bigserial NOT NULL,
    product_id bigint NOT NULL,
    question_body varchar(1000) NOT NULL,
    date varchar NOT NULL,
    asker_name varchar(60) NOT NULL,
    asker_email varchar(60) NOT NULL,
    reported smallint,
    question_helpfulness smallint,
    PRIMARY KEY(id)
  );

  CREATE TABLE answers(
    id bigserial NOT NULL,
    "Questions_id" bigint NOT NULL,
    body varchar(1000) NOT NULL,
    date varchar NOT NULL,
    answerer_name varchar(60) NOT NULL,
    asker_email varchar(60) NOT NULL,
    reported smallint NOT NULL,
    helpfulness smallint,
    PRIMARY KEY(id)
  );

  CREATE TABLE photos(
    id bigserial NOT NULL,
    "Answers_id" bigint NOT NULL,
    photo_url varchar NOT NULL,
    PRIMARY KEY(id)
  );

  ALTER TABLE photos
    ADD CONSTRAINT "Answers_Photos"
      FOREIGN KEY ("Answers_id") REFERENCES answers (id);

  ALTER TABLE answers
    ADD CONSTRAINT "Questions_Answers"
      FOREIGN KEY ("Questions_id") REFERENCES questions (id);

  CREATE INDEX product_index on questions (product_id);

  CREATE INDEX question_index on answers ("Questions_id");
  `,
  )
  .then((res) => {
    console.log('RESPONSE', res);
    db.end();
  })
  .catch((err) => {
    console.log('ERROR', err);
  });
