import React, { Component } from 'react';
import Message from './Message';
import { Consumer } from '../../context';
import { Link } from 'react-router-dom';

class Messages extends Component {
render() {  
        return(
            <Consumer>
                {value => {
                    const { messages } = value;
                    return (
                        <div>
                        <div className="text-center">
                        <button type="button" className="btn btn-outline-secondary"><Link to='/message/add' className="nav-link text-color ">Share your Story</Link></button>
                        </div>
                        <div className="mt-4">
                            {messages.map((message) => (
                                <Message key={message._id} message={message} />
                            ))}
                        </div>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default Messages;