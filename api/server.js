const express = require("express");
const session = require('express-session');

const apiRouter = require("./api-router.js");
const configureMiddleware = require("./configure-middleware.js");

const server = express();


configureMiddleware(server);


server.use("/api", apiRouter);

server.get('/', (req, res) => {
    res.json({ api: "This is working" })
});

module.exports = server;
