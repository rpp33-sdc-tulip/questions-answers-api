const { Client } = require('pg');
const dbconfig = require('../config');

// create new database connection
const db = new Client(dbconfig.cn);
db.connect((err, res) => {
  if (err) {
    console.log('ERROR', err);
  }
});

db.query(
  `COPY questions
  FROM '/Users/jeffsparrow/Developer/HackReactor/RPP33/SDC/questions.csv'
  DELIMITER ','
  CSV HEADER;

  COPY answers
  FROM '/Users/jeffsparrow/Developer/HackReactor/RPP33/SDC/answers.csv'
  DELIMITER ','
  CSV HEADER;

  COPY photos
  FROM '/Users/jeffsparrow/Developer/HackReactor/RPP33/SDC/answers_photos.csv'
  DELIMITER ','
  CSV HEADER;
  `,
)
  .then((res) => {
    console.log(res);
    db.end();
  })
  .catch((err) => {
    console.log(err);
  });
