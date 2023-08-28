const express = require('express');
const mysql = require('mysql');

const app = express();

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'db'
};

app.get('/', (req, res) => {
  const conn = mysql.createConnection(config);

  const insertionQuery = `INSERT INTO people(name) values('Bruno')`;

  conn.query(insertionQuery);

  const selectQuery = `SELECT * FROM people`;

  conn.query(selectQuery, (err, result) => {
    if (err) throw err;
    
    const people = result.map(person => `<li>${person.name}</li>`).join('');
    
    conn.end();
    res.send(`<h1>Full Cycle Rocks!</h1><ul>${people}</ul>`);
  });

});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});