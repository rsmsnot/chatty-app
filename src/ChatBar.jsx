import React, { Component } from 'react';


class ChatBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.currentUser
        };
        this.inputSubmit = this.inputSubmit.bind(this);
        this.nameChange = this.nameChange.bind(this);
    }

    nameChange(event) {
        let newUsername;
        if (event.target.value.length < 1) {
            newUsername = 'Anonymous'
        } else {
            newUsername = event.target.value;
        }
        this.props.changeUsername(newUsername);
    }


    inputSubmit(event) {
        if (event.key === 'Enter') {
            const messageContent = {
                content: event.target.value,
                username: this.props.currentUser
            }
            console.log(event.key, 'pressed');
            this.props.sendMessage(messageContent);
            event.target.value = '';
        }
    }


    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" placeholder="Your Name (Optional)" type="text" onBlur={this.nameChange} />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.inputSubmit} />
            </footer>
        )
    }
}

export default ChatBar;

