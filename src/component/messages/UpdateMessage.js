import React, { Component } from 'react';
import {Consumer} from '../../context';
import MessageTemplate from '../layout/MessageTemplate';

import axios from 'axios';

class UpdateMessage extends Component {
    state = {
        title: '',
        email: '',
        mood: '',
        errors: {},
    };

    async componentDidMount() {
        const { _id } = this.props.match.params;
        console.log(_id)
        const res = await axios.get(`https://sheltered-castle-37414.herokuapp.com/api/posts/${_id}`);

        const message = res.data;

        this.setState({
            title: message.title,
            body: message.body,
            mood: message.mood,
        })
    }

    onChange = e => this.setState({ [e.target.name]:e.target.value});
    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const { title, body, mood } = this.state;

        if(title === '') {
            this.setState({errors: { title: 'U NEED A title!!!!'}});
            return;
        }
        if(body === '') {
            this.setState({errors: { body: 'U NEED A NAME!!!!'}});
            return;
        }
        if(mood === '') {
            this.setState({errors: { mood: 'U NEED A NAME!!!!'}});
            return;
        }

        const updatedMessage = {
            title,
            body,
            mood,
        }

        const { _id } = this.props.match.params;

        const res = await axios.put(`https://sheltered-castle-37414.herokuapp.com/api/posts/${_id}`, updatedMessage);

        dispatch({type: 'UPDATE_MESSAGE', payload: res.data});

        this.setState({
            title: '',
            body: '',
            mood: '',
            errors: {}
        });

        this.props.history.push('/');
    }
  render() {
      const {title,body,mood, errors} = this.state;
      return(
          <Consumer>
              {value => {
                  const {dispatch} = value;
                  return(
                    <div className="card mb-3">
                        <div className="card-header">Edit A Message</div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                <MessageTemplate label="Name" name="title" placeholder="Enter title" value={title} onChange={this.onChange} error={errors.title}/>
                                <MessageTemplate label="body" name="body" placeholder="Enter body" value={body} onChange={this.onChange} error={errors.body}/>
                                <MessageTemplate label="mood" name="mood" placeholder="Enter mood" value={mood} onChange={this.onChange} error={errors.mood}/>
                                <input type="submit" value="Update Message" className="btn btn-block"/>
                            </form>
                        </div>
                    </div>
                  )
              }}
          </Consumer>
      )
    }
}
export default UpdateMessage;
