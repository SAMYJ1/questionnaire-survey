const express = require('express');
const connection = require('./connectSql.js');

const tongji = express.Router();

tongji.all('/tongji',function(req, res){
	// res.setHeader("Content-Type","text/plain");
	res.setHeader("Access-Control-Allow-Methods","POST");
	res.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:8080");

	let obj = Object.keys(req.body)[0];
	let parse = JSON.parse(obj)['a'];
	let CName = JSON.parse(obj)['b'];

	CName = `C${CName}`;

	let a = Object.assign({},obj);

	console.log(CName);
	
	let key = Object.keys(parse);

	let value = key.map((a)=>parse[a]);

	let keys =key.map((a)=>'q' + a);
	let [createStr,insertStr,valStr] = ['','',''];
	for(let i of keys){
		createStr += ',' + i + ' text';
		insertStr += ','+i;
	}
	for(let i of value){
		valStr +=`, '${i}'`;
	}
	//新建统计表格字符串
	let createTable = `create table ${CName}(id int primary key${createStr})`;


	connection.query(createTable,function(err,rows,fields){
			if(err) {
				
				connection.query(`select * from ${CName}`,function(err,rows,fields){
					if(err) throw err;
					//统计表插入数据字符串
					let insertTable = `insert into ${CName}(id${insertStr}) values(${rows.length+1}${valStr})`;
					connection.query(insertTable,function(err,rows,fields){
						if(err) throw err;
						
						connection.query(`select * from ${CName}`,function(err,rows,fields){
							if (err) throw err;
							res.send(rows);
						})
					});
					
				})
			}else{
				connection.query(`insert into ${CName}(id${insertStr}) values(1${valStr})`,function(err,rows,fields){
					if (err) throw err;
					connection.query(`select * from ${CName}`,function(err,rows,fields){
						if (err) throw err;
						res.send(rows);
					})
				})
			}

		});
	
	// res.end();
})

module.exports = tongji;