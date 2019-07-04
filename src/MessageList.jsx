import React, { Component } from 'react';
import Message from './Message.jsx'
import Notification from './Notifications.jsx';

class MessageList extends React.Component {
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
                content={message.content}/>
            }
        });
    
        return (
            <main className="messages">
                {allMessages}
                <div className="message system">
                </div>
            </main>
        )
    }
}

export default MessageList;