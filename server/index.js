require("dotenv").config();
const express = require("express");
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/api', async (req,res) => {
	res.status(200).json('it works')
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`listening on port ${PORT}`));
