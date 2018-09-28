import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case 'DELETE_MESSAGE':
        return {
            ...state,
            messages: state.messages.filter(message => message._id !== action.payload)
        };
        case 'ADD_MESSAGE':
        return {
            ...state,
            messages: [action.payload, ...state.messages]
        };
        case 'UPDATE_MESSAGE':
        return {
            ...state,
            messages: state.messages.map(message => message._id === action.payload._id ? (message = action.payload) : message )
        };
        default:
            return state;
    }
}

export class Provider extends Component {
  state = {
    messages: [],
    dispatch: action => { this.setState(state => reducer(state,action)) }
  }
 async componentDidMount() {
    const res = await axios.get('https://sheltered-castle-37414.herokuapp.com/api/posts');

    this.setState({
        messages: res.data
    })
  }
  render() {
      return (
        <Context.Provider value={this.state}>
        {this.props.children}
        </Context.Provider>
      )
  }
}

export const Consumer = Context.Consumer;
