/* eslint-disable no-console */
import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Anonymous', // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      webSocket: null
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.sendImage = this.sendImage.bind(this);
  }

  sendMessage(message) {
    const newMessageObj = {
      type: 'postMessage',
      username: this.state.currentUser,
      content: message.content
    }
    this.state.webSocket.send(JSON.stringify(newMessageObj));

  }

  changeUsername(event) {
    if (this.state.currentUser != event) {
      const notification = {
        type: 'postNotification',
        content: `${this.state.currentUser} changed their name to ${event}`
      }
      this.state.webSocket.send(JSON.stringify(notification));
      this.setState({ currentUser: event })
    }
  }
  sendImage(url) {
    const newImageObj = {
      type: 'postImage',
      username: this.state.currentUser,
      url: url.url
    }
    this.state.webSocket.send(JSON.stringify(newImageObj));
  }


  componentDidMount() {
    const webSocket = new WebSocket('ws://localhost:3001');
    webSocket.onopen = function () {
      console.log('Connected to server');
    };
    this.setState({ webSocket })
    webSocket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      switch (parsedData.type) {
        case 'incomingMessage':
          const incomingMessage = {
            type: 'message',
            id: parsedData.id,
            username: parsedData.username,
            content: parsedData.content
          }
          const messages = this.state.messages.concat(incomingMessage);
          this.setState({ messages: messages });
          break;

        case 'incomingNotification':
          const incomingNotification = {
            type: 'notification',
            id: parsedData.id,
            username: parsedData.username,
            content: parsedData.content
          }
          const notifications = this.state.messages.concat(incomingNotification);
          this.setState({ messages: notifications });
          break;

        case 'incomingImage':
          const incomingImage = {
            type: 'image',
            id: parsedData.id,
            username: parsedData.username,
            url: parsedData.url
          }
          const images = this.state.messages.concat(incomingImage);
          console.log(images);
          this.setState({ messages: images });
          break;

        case 'updateUserCount':
          this.setState(parsedData);
          this.setState({ userCount: parsedData.connectedUsers });
          break;

        default: throw new Error('Unknown event type ' + parsedData.type);
      }

    }
  }
  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="title-container">
            <a href="/" className="navbar-brand">Chatty</a>
            <p className="userCount">Connected users: {this.state.connectedUsers}</p>

          </div>
        </nav>
        <ChatBar currentUser={this.state.currentUser} sendMessage={this.sendMessage} changeUsername={this.changeUsername} sendImage={this.sendImage} />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}
export default App;
