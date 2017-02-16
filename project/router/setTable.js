const express = require('express');
const connection = require('./connectSql.js');

const setTable = express.Router();

setTable.all('/setTable',function(req, res){
	if(req.url !=="/favicon.ico"){
		res.setHeader("Content-Type","text/plain");
		res.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:8080");
	}
	console.log(req.body);
	res.send('hello');
	let tableName = `table${req.body.id}`;

	let createStr = `create table ${tableName} (id int primary key,tName text, question text, A text,B text, C text, D text)`;
	connection.query(createStr,function(err, rows, fields){
		if (err){
			connection.query(`insert into ${tableName}(id,tName,question,A,B,C,D) values(${parseInt(req.body.qid)} ,'${req.body.tName}','${req.body.question}','${req.body.A}','${req.body.B}','${req.body.C}','${req.body.D}')`,function(err,rows,fields){
				if(err) throw err;
			});
		}else{
			connection.query(`insert into ${tableName}(id,tName,question,A,B,C,D) values(${parseInt(req.body.qid)} ,'${req.body.tName}','${req.body.question}','${req.body.A}','${req.body.B}','${req.body.C}','${req.body.D}')`,function(err,rows,fields){
				if(err) throw err;
			});
		}
	})
	
	// connection.query(`insert into questionnaire1(id,question,A,B,C,D) values(${parseInt(req.body.name)} ,'${req.body.question}','${req.body.A}','${req.body.B}','${req.body.C}','${req.body.D}')`,function(err,rows,fields){
	// 	if(err) throw err;
		
	// })
})

module.exports = setTable;