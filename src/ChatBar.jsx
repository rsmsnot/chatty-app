import React, { Component } from 'react';


class ChatBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: this.props.currentUser
        };
        this.inputSubmit = this.inputSubmit.bind(this);
        this.nameChange = this.nameChange.bind(this);
        this.submitImage = this.submitImage.bind(this);
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
            if (messageContent.content.length < 1) {
                alert('Please enter a comment');
                return;
            }
            console.log(event.key, 'pressed');
            this.props.sendMessage(messageContent);
            event.target.value = '';
        }
    }

    submitImage(event) {
        if (event.key === 'Enter') {
            const imageUrl = {
                username: this.props.currentUser,
                url: event.target.value
            }
            if (imageUrl.url.length < 1) {
                alert('Please enter a valid URL');
                return;
            }
            console.log(event.key, 'pressed');
            this.props.sendImage(imageUrl);
            event.target.value = '';
        }
    }

    render() {
        return (
            <footer className="chatbar">
                <input className="chatbar-username" placeholder="Your Name (Optional)" type="text" onBlur={this.nameChange} />
                <input className="chatbar-message" placeholder="Type a message and hit ENTER" onKeyPress={this.inputSubmit} />
                <input className="chatbar-image" placeholder="Submit an image/gif url and hit ENTER" onKeyPress={this.submitImage} />
            </footer>
        )
    }
}

export default ChatBar;

