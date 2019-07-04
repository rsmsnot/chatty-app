import React, { Component } from 'react';


class ChatBar extends React.Component {
    constructor(props){
        super(props)
        this.inputSubmit = this.inputSubmit.bind(this);
    }

    randomIdGenerator() {
        return Math.floor(Math.random() * 1000 + 1)
    }

    inputSubmit(event) {
        if (event.key === 'Enter') {
            const messageContent = {
                id: this.randomIdGenerator(),
                content: event.target.value,
                username: this.props.currentUser.name
            }
            console.log(event.key, 'pressed');
            this.props.sendMessage(messageContent);
            event.target.value = '';
            // this.props.addNewMessage(this.state.username, this.state.content);
            // this.setState({
            //     username: this.state.user,
            //     content: this.state.content 
            }
        }
    

    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" placeholder="Your Name (Optional)" />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.inputSubmit}/>
            </footer>
        )
    }
}

export default ChatBar;

