
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const usersRouter = require('./users/user-router.js');
const addRouter = require('./fetchRewards/addTransactions-router.js');
const spendRouter = require('./fetchRewards/spend-router.js');
const balanceRouter = require('./fetchRewards/balance-router.js')

const server = express();

server.use(helmet());
server.use(cors());
server.options('*', cors());
server.use(express.json());

server.use('/api/users', usersRouter);
server.use('/api/addTransactions', addRouter);
server.use('/api/spendPoints', spendRouter);
server.use('api/pointBalance', balanceRouter);

server.get("/", (req, res) => {
    res.json({ api: "up" });
});

server.all('*', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
});

module.exports = server;