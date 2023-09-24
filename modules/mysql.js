const mysql = require("mysql2");
const consoled = require("consoled.js")
const connection = mysql.createConnection({
  host: '',
  user: '',
  password: '',
  database: ''
});

connection.connect(err => {
  if (err) return consoled.red("[MYSQL] Error Connecting: " + err.stack);
  else consoled.green("[MYSQL] Successfully Connected as: " + connection.threadId)
})

module.exports = (user_id, username, type, value) => {
  const query = `INSERT INTO andurilite (user_id, username, type, value, time) VALUES (${user_id}, '${username}', '${type}', '${value}', '${new Date().toLocaleString("tr-TR")}')`
  connection.query(query, (err, results, fields) => {
    if(err) return consoled.red("[MYSQL] Error Querying:\n" + err);
  })
}