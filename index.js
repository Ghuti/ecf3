import express from 'express';

var server = require(process.cwd() + '/server')
const app = express();
var http = require('http').createServer(app);

app.use(express.static('public'));
app.use('/', server);

app.set('view engine', 'ejs')
 
http.listen(3000, function(){
    console.log('listening on *:3000');
});