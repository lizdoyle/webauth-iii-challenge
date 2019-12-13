const express = require("express");
const session = require('express-session');

const apiRouter = require("./api-router.js");
const userRouter = require('../users/users-router.js');
const configureMiddleware = require("./configure-middleware.js");

const jwt = require('jsonwebtoken');


const server = express();


configureMiddleware(server);


server.use("/api", apiRouter);
server.use('/users', userRouter);

server.get('/', (req, res) => {
    res.json({api: "This is working!"})
})

server.get('/token', (req, res) => {

    const payload = {
        username: 'lizdoyle',
        department: 'development'

    };

    const secret = 'ilovesecretstheyarefunandoverlycomplicated';

    const options = {
        expiresIn: '1h'
    }

    const token = jwt.sign(payload, secret, options)



    res.json(token)
});



module.exports = server;
