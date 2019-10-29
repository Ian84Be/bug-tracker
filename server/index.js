require("dotenv").config();
const express = require("express");
const helmet = require('helmet');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', async (req,res) => {
	res.status(200).json('it works')
});

const ticketsRouter = require('./api/tickets-router');
server.use('/api/tickets', ticketsRouter);

const usersRouter = require('./api/users-router');
server.use('/api/users', usersRouter);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`listening on port ${PORT}`));
