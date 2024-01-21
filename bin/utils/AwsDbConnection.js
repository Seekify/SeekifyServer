const mysql = require('mysql');
const Authorization = require('../utils/Authorization')

// Database configuration
const dbConfig = {
  host: Authorization.RDS_HOSTNAME,
  user: Authorization.RDS_USERNAME,
  password: Authorization.RDS_PASSWORD,
  database: Authorization.RDS_DB_NAME,
  port: Authorization.RDS_PORT
};

// Create a connection to the database
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
});

module.exports = connection;