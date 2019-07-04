/* eslint-disable no-console */
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
    let connectedUsers = { type: 'updateUserCount', connectedUsers: wss.clients.size };
    broadcastMessages(connectedUsers);

    console.log('Client connected');

    ws.on('message', (message) => {
        let messageObj = JSON.parse(message);
        console.log(messageObj);
        // console.log(messageObj.type);
        // console.log('User ' + messageObj.username + ' says ' + messageObj.content);
        switch (messageObj.type) {
            case 'postMessage':
                const newMessage = {
                    type: 'incomingMessage',
                    id: UUID,
                    username: messageObj.username,
                    content: messageObj.content,
                }
                console.log(newMessage);
                broadcastMessages(newMessage);
                break;

            case 'postNotification':
                const newNotification = {
                    type: 'incomingNotification',
                    id: UUID(),
                    content: messageObj.content
                };
                console.log(newNotification);
                broadcastMessages(newNotification)
                break;
        }
    });


    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
        let connectedUsers = { type: 'updateUserCount', connectedUsers: wss.clients.size };
        broadcastMessages(connectedUsers);
        console.log('Client disconnected')
    });

});


