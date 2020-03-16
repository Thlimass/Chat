//import do express para rota.
const express = require('express');
//import do path 
const path = require('path');

//criando o app do express.
const app = express();
//definindo o protocolo http.
const server = require('http').createServer(app);
//definindo protocolo wss p/ web socket.
const io = require('socket.io')(server);


//pasta p/ os arq. publicos "front"
app.use(express.static(path.join(__dirname, 'public')));
//add as views - ejs
app.set('views', path.join(__dirname, 'public'));
//definir a engine com html.
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

//renderizar o view p/ quando acessar o servidor.
app.use('/', (req, res) => {
    res.render('index.html');
});

//Armazenar todas as menssagens com o array.
let messages = [];



//conexao do usuario com o socket.
io.on('connection', socket => {
    console.log(`Socket conectado: ${socket.id}`);
    
    socket.emit('previousMessages', messages);

    socket.on('sendMessage', data => {
        //console.log(data);
        //guarndando todas as menssagens no array.
        messages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    });
});


server.listen(3000);

