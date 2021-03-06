#!/usr/bin/env node
const WebSocket = require('ws');

const express = require('express');
const http = require('http');

// создаём Express-приложение
const app = express();

app.use(express.static('dist'));

const server = http.createServer(app);


const wss = new WebSocket.Server({ server: server });

const https = require('https');

let couter = '-';

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws) {
  ws.send(couter);
});

setInterval(function() {
  const req = https.get('https://usher2.club/d1_ipblock.json', resp => {
    let data = '';

    // A chunk of data has been recieved.
    resp.on('data', (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
      const arr = JSON.parse(data);
      couter = arr[arr.length - 1].y;
      wss.broadcast(couter);
    });

  });
  req.on('error', (e) => {
    console.error(e);
  });

  req.end();
}, 15000);

server.listen( process.env.PORT || 8080);
