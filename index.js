// code away!
const express = require('express')
const server = express()
const serverImport = require('./server')
const userRouter = require('./users/userRouter')


server.use(express.json())
server.use('', serverImport)
server.use('/users', userRouter)

server.listen(8000, () => {
    console.log('Server is running at localhost:8000')
})