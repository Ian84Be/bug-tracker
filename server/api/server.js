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

const projectsRouter = require('./projects-router');
const ticketsRouter = require('./tickets-router');
const usersRouter = require('./users-router');

server.use('/api/projects', projectsRouter);
server.use('/api/tickets', ticketsRouter);
server.use('/api/users', usersRouter);

module.exports = server;
