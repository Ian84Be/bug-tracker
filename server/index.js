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

const usersControl = require('./api/users-control');
server.use('/api/users', usersControl);

server.post('/api/bugs', (req, res) => {
	console.log(req.body);
	res.status(201).json({message:'got it, thanks' + req.body.from})
})

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`listening on port ${PORT}`));
