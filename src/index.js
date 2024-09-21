import express from 'express'
import cors from 'cors'
import http from 'http'
import { Server } from 'socket.io'

const app = express()
const server = http.createServer(app)
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:5173', 'https://hackathon-bs.github.io']
}})

app.use(cors())

io.on('connection', (socket) => {
  console.log('New client connected')

  socket.on('message', (message) => {
    console.log('Message received:', message)
    io.emit('message', message) // Broadcast the message to all clients
  })

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

server.listen(4001, () => {
  console.log('Server is running on port 4001')
})
