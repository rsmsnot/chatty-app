import React, { Component } from 'react';


class Image extends React.Component {
    render() {
        return (
            <div>
                <span className="message-username">{this.props.username}</span>
                <img className="image" src={this.props.content} />
            </div>

        )
    }
}

export default Image