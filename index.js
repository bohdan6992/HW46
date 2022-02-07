const app = require('express')();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = '3000';

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

io.on('connection', (socket) => {
  let userMsgCount = 0

  console.log(`User ${socket.id} connected`);

  socket.on('input value', (msg) => {
    userMsgCount++;
    console.log(`_________________________\nNew message: ${msg}\n${socket.id}: ${userMsgCount}`)
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
  });
})

setInterval(() =>{
  io.emit('server answer', 'Hello user');
}, 1500)

server.listen(PORT, () => {
  console.log(`Server running on  ${PORT}`);
});