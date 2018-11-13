const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

io.on('connection', socket => {
    console.log('user connected :', socket.id)
    socket.on('loaded', (data) => {
        console.log('Data from client :', data)
    })
    socket.on('message', (data) => {
        console.log('Message received', data)
        io.emit('message', data)
    })
    socket.on('messages', (data) => {
        socket.broadcast.emit('messages', data)
    })
    socket.on('user', (data) => {
        io.emit('user', data)
    })
    socket.on('user', (data) => {
        socket.broadcast.emit('user', data)
    })
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

http.listen(3000, () => {
    "Server is up and running on http://10.44.2.194:3000"
})