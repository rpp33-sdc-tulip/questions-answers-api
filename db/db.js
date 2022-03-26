const { Client } = require('pg');
const dbconfig = require('../config');

// create new db connection
const db = new Client(dbconfig.cn);
db.connect((err, res) => {
  if (err) {
    console.log('ERROR', err);
  }
  console.log('RESPONSE', res);
});

db
  .query('SELECT * FROM answers')
  .then((res) => {
    console.log(res);
    db.end();
  });
