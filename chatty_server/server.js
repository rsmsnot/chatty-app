// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const UUID = require('uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
    // Make the express server serve static assets (html, javascript, css) from the /public folder
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    function broadcastMessages(message) {
        wss.clients.forEach((client) => {
            client.send(JSON.stringify(message));
        })
    }

    console.log('Client connected');

    ws.onmessage = function (message) {
        let messageObj = JSON.parse(message.data);
        // console.log(messageObj.type);
        console.log('User ' + messageObj.username + ' says ' + messageObj.content);
        if (messageObj.type === 'message') {
            const newMessage = {
                id: UUID(),
                username: messageObj.username,
                content: messageObj.content,
            }
            // console.log(newMessage);
            broadcastMessages(newMessage);
        }
    }

    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => console.log('Client disconnected'));
});


