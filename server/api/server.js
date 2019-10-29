require("dotenv").config();
const express = require("express");
const helmet = require('helmet');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', async (req,res) => {
	res.status(200).json({message:'it\'s alive!'})
});

const ticketsRouter = require('./tickets-router');
server.use('/api/tickets', ticketsRouter);

const usersRouter = require('./users-router');
server.use('/api/users', usersRouter);

module.exports = server;
