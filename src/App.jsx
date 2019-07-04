import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx'
import MessageList from './MessageList.jsx'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: 'Anonymous' , // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      webSocket: null
    }
    this.sendMessage = this.sendMessage.bind(this);
  }

  // addNewMessage(message) {
  //   const messages = this.state.messages.concat(message);
  //   this.setState({ messages: messages });
  // }



  sendMessage(message) {
    const newMessageObj = {
      type: 'message',
      username: this.state.currentUser,
      content: message.content
    }
    this.state.webSocket.send(JSON.stringify(newMessageObj));

  }


  componentDidMount() {
    const webSocket = new WebSocket('ws://localhost:3001');
    webSocket.onopen = function () {
      console.log('Connected to server');
    };
    this.setState({ webSocket })

    webSocket.onmessage =  (event) => {
      const parsedData = JSON.parse(event.data);
      console.log(parsedData);
      // console.log(parsedData.username.name);
      // console.log(parsedData.content);
      const messages = this.state.messages.concat(parsedData);
      this.setState({ messages: messages });
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
        </nav>
        <ChatBar currentUser={this.state.currentUser} sendMessage={this.sendMessage} />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}
export default App;
