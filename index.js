const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const server = express();

// Read JSON / middlewares
server.use(
    express.urlencoded({
        extended: true,
    }),
)

server.use(express.json());

// route test
server.get('/', (req, res) => {
    res.json({ message: "Route home is working!" });
})

// routes API
const personRoutes = require('./routes/personRoutes');
server.use('/person', personRoutes);


// connecting to database
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD);

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.w1es0.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log("Connected to database!");
        // set port
        server.listen(3000);
    })
    .catch((err) => console.log(err));
