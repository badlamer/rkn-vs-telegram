#!/usr/bin/env node
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

const https = require('https');

let couter = 0;

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
  try {
    https.get('https://2018.schors.spb.ru/d1_ipblock.json', resp => {
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
  } catch (e) {
  }
}, 10000);
