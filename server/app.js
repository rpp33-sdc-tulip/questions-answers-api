const express = require('express');
const app = express();
const port = 3000;

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
  res.send('SDC');
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})

module.exports = port;