const mysql = require('mysql');

const connection =  mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'project'
});
connection.connect();

module.exports = connection;