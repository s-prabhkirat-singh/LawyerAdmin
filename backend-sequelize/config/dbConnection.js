const dotenv = require("dotenv");
dotenv.config();

const { DB_HOST, DB_USERNAME, DB_PASSSWORD, DB_NAME } = process.env;

var mysql = require("mysql");

var conn = mysql.createConnection({
  host: DB_HOST,
  user: DB_USERNAME,
  password: DB_PASSSWORD,
  database: DB_NAME,
});

conn.connect(function (err) {
  if (err) throw err;
  console.log(`${DB_NAME} database connected successfully!!`);
});

module.exports = conn;
