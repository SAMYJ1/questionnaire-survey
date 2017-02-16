const express = require('express');
const connection = require('./connectSql.js');

const selectTable = express.Router();

selectTable.all('/select',function(req,res){
	res.setHeader("Content-Type","text/plain");
	res.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:8080");
	connection.query('show tables',function(err,rows,fields){
		if(err) throw err;
		console.log(rows);
		res.send(rows);
	})
})

module.exports = selectTable;