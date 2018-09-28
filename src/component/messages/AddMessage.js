import React, { Component } from 'react';
import {Consumer} from '../../context';
import MessageTemplate from '../layout/MessageTemplate';
import axios from 'axios';
import { Link } from 'react-router-dom';
class AddMessage extends Component {
    state = {
        title: '',
        body: '',
        mood: '',
        errors: {},
    };

    onChange = e => this.setState({ [e.target.name]:e.target.value});
    onSubmit = async (dispatch, e) => {
        e.preventDefault();
        const { title, body, mood } = this.state;

        if(title === '') {
            this.setState({errors: { title: 'U NEED A title!!!!'}});
            return;
        }
        if(body === '') {
            this.setState({errors: { body: 'U NEED A body!!!!'}});
            return;
        }
        if(mood === '') {
            this.setState({errors: { mood: 'U NEED A NAME!!!!'}});
            return;
        }

        const newPost = {
            title,
            body,
            mood,
        }

        const config = {
            headers: {
              'content-type': 'application/json'
            }
          }

        const res = await axios.post('https://sheltered-castle-37414.herokuapp.com/api/posts', newPost, config);
        console.log(newPost, config)
        dispatch({type: 'ADD_MESSAGE',payload: res.data});


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
                    <div className="col col-md-8 col-lg-6 mx-auto text-center">
                        <button type="button" className="btn btn-outline-secondary mb-5"><Link to='/' className="nav-link text-color">Go Back</Link></button>
                            <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                                <MessageTemplate label="title" name="title" placeholder="Choose your title.." value={title} onChange={this.onChange} error={errors.title}/>
                                <MessageTemplate label="mood" name="mood" placeholder="What's your mood?..." value={mood} onChange={this.onChange} error={errors.mood}/>
                                <textarea className="md-textarea form-control background-color border-0 mb-3" type="body" label="body" name="body" rows="8" style={{maxHeight: '200px', minHeight: '100px'}} placeholder="Tell your story..." value={body} onChange={this.onChange} error={errors.body}/>
                                <input type="submit" value="Share your Story" className="btn btn-outline-secondary text-center submit-button mb-4" style={{ maxWidth: '100%'}}/>
                            </form>
                    </div>
                  )
              }}
          </Consumer>
      )
    }
}
export default AddMessage;
