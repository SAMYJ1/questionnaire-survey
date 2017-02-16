const express = require('express');
const connection = require('./connectSql.js');

const gen = express.Router();



gen.all('/gen',function(req,res){
	// res.writeHead(200,{"Content-Type":"text/plain","Access-Control-Allow-Origin":"http://localhost:8080"})
	res.setHeader("Content-Type","text/plain");
	res.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:8080");
	console.log(req.body)
	let selStr = Object.keys(req.body)[0];
	
	connection.query(`select * from ${selStr}`,function(err,rows,field){
		if(err) throw err;
		res.send(rows);
	})
})


module.exports = gen;