import React, { Component } from 'react';


class Image extends React.Component {
    render() {
        return (
            <img className="image" src={this.props.content}/>
        )
    }
}

export default Image