require('dotenv').config();

const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);
const APP_PORT = process.env.PORT;

server.listen(APP_PORT, () =>
  console.log(`Server listining on port: ${APP_PORT}!`)
);

server.on('listening', function() {

  const addressListener = require('./listener/contractlistener.js');

  addressListener.listenTransferOnAddress();

});