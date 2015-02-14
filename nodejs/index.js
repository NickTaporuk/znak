var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mysql = require('mysql');
//======================================mysql=====================================================//
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'nodejs'
});

connection.query('SELECT * FROM users', function(error, result, fields){
    console.log(result);
    connection.end();
});
//======================================end mysql=================================================//
app.get('/', function(req, res){
    //res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        console.log('message: ' + msg.message);
        io.emit('chat message', msg);

    });
});
/*io.on('connection', function(socket){
    socket.on('chat message', function(msg){
        io.emit('chat message', msg);
    });
});*/

http.listen(3000, function(){
    console.log('listening on *:3000');
});