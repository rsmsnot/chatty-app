import React, { Component } from 'react';
import Message from './Message.jsx'
import Notification from './Notifications.jsx';
import Image from './Images.jsx';

class MessageList extends React.Component {
    scrollToBottom() {
        this.messagesEnd.scrollIntoView({ behavior: 'smooth' });
    }
    componentDidUpdate() {
        this.scrollToBottom();
    }
    render() {
        const allMessages = this.props.messages.map(message => {
            if (message.type === 'message') {
                return <Message
                    key={message.id}
                    username={message.username}
                    content={message.content} />
            }
            if (message.type === 'notification') {
                return <Notification
                    key={message.id}
                    content={message.content} />
            }
            if(message.type === 'image') {
                return <Image
                key={message.id}
                content={message.url} />
            }
        });

        return (
            <main className="messages">
                {allMessages}
                <div className="message system" ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </main>
        )
    }
}

export default MessageList;