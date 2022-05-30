const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const server = express()

// ler JSON / middlewares
server.use(
    express.urlencoded({
        extended: true,
    }),
)

server.use(express.json())

// rotas
server.get('/', (req, res) => {

    res.json({message: "Rota home funcionando!"})
})

// rotas da api
const personRoutes = require('./routes/personRoutes')
server.use('/person', personRoutes)


// estabelecendo conexão com o bando de dados
const DB_USER = process.env.DB_USER
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.w1es0.mongodb.net/?retryWrites=true&w=majority`)
.then(() => {
    console.log("Estabeleceu conexão com o bando de dados!")
    // setar uma porta
    server.listen(3000)
})
.catch((err) => console.log(err))
