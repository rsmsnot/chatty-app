/* eslint-disable no-console */
// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const UUID = require('uuid');

const PORT = 3001;

const server = express()
    .use(express.static('public'))
    .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${PORT}`));

const wss = new SocketServer({ server });

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
        switch (messageObj.type) {
            case 'postMessage':
                const newMessage = {
                    type: 'incomingMessage',
                    id: UUID,
                    username: messageObj.username,
                    content: messageObj.content,
                }
                broadcastMessages(newMessage);
                break;

            case 'postNotification':
                const newNotification = {
                    type: 'incomingNotification',
                    id: UUID(),
                    content: messageObj.content
                };
                broadcastMessages(newNotification)
                break;

            case 'postImage':
                const newImage = {
                    type: 'incomingImage',
                    id: UUID(),
                    username: messageObj.username,
                    url: messageObj.url
                }
                broadcastMessages(newImage);
        }
    });

    ws.on('close', () => {
        let connectedUsers = { type: 'updateUserCount', connectedUsers: wss.clients.size };
        broadcastMessages(connectedUsers);
        console.log('Client disconnected')
    });

});


