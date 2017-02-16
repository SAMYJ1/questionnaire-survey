const express = require('express');
const http = require('http');
const bodyParser =require('body-parser');
const connection = require('./router/connectSql.js');

const app =express();

const server = http.createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));


//setTable
app.use('/user', require('./router/setTable.js'));

//selectTable
app.use('/user',require('./router/showTable.js'));

//generateTable
app.use('/user',require('./router/generateTable.js'));

//tongji
let count = 0;
app.use('/user',require('./router/tongji.js'));



let port = process.env.PORT || 3000;
server.listen(3000,()=>{
	console.log(`app is listening at port 3000`);
})

