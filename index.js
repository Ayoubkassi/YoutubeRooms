const express = require('express')
const path = require('path')
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);



const PORT = process.env.PORT || 5000




app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('welcome'))
app.get('/app', (req, res) => res.render('index'))

app.get('/about',function(req,res) {
  res.sendFile('about.html');
});

io.on('connection', (socket) => {
  socket.on('event', function(msg){
    io.emit('event',msg);
  });
  console.log('a user connected');
});

server.listen(PORT, () => console.log(`Hey Hey and welocme again Listening on ${ PORT }`))
