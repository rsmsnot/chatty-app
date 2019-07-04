import React, { Component } from 'react';


class Notification extends React.Component {
    render() {
        return (
            <div className='nameChange'>
                {this.props.content}
            </div>
        )
    }
}

export default Notification