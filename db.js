const mysql = require('mysql')
connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : '',
  database: 'myBlog'
})

connection.connect()

let query = async (str) => {
  return new Promise((resolve, reject) => {
    connection.query(str, function (error, results, fields) {
      if (error) throw error;
      resolve(results)
    });
  })
}

module.exports = query
