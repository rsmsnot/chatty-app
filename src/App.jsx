/* eslint-disable no-console */
import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'
import Notification from './Notifications.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Anonymous', // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      webSocket: null
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this)
  }

  sendMessage(message) {
    const newMessageObj = {
      type: 'postMessage',
      username: this.state.currentUser,
      content: message.content
    }
    console.log(newMessageObj);
    this.state.webSocket.send(JSON.stringify(newMessageObj));

  }

  changeUsername(event) {
    if (this.state.currentUser != event) {
      const notification = {
        type: 'postNotification',
        content: `${this.state.currentUser} changed their name to ${event}`
      }
      console.log(notification);
      this.state.webSocket.send(JSON.stringify(notification));
      this.setState({ currentUser: event })
    }
  }


  componentDidMount() {
    const webSocket = new WebSocket('ws://localhost:3001');
    webSocket.onopen = function () {
      console.log('Connected to server');
    };
    this.setState({ webSocket })

    webSocket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      // console.log(parsedData);
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

        case 'updateUserCount':
          this.setState(parsedData);
          this.setState({ userCount: parsedData.connectedUsers });
          break;

        default: throw new Error('Unknown event type ' + parsedData.type);
      }

    }
    // setTimeout(() => {
    //   // Add a new message to the list of messages in the data store
    //   const newMessage = { id: 3, username: 'Michelle', content: 'Hello there!' };
    //   const messages = this.state.messages.concat(newMessage)
    //   // Update the state of the app component.
    //   // Calling setState will trigger a call to render() in App and all child components.
    //   this.setState({ messages: messages })
    // }, 3000);
  }
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <p className="userCount">Connected users: {this.state.connectedUsers}</p>
        </nav>
        <ChatBar currentUser={this.state.currentUser} sendMessage={this.sendMessage} changeUsername={this.changeUsername} />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}
export default App;
