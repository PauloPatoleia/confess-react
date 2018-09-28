import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context';
import axios from 'axios';
import * as moment from 'moment';

class Message extends Component {
  onDeleteClick = async (_id, dispatch) => {
    await axios.delete(`https://sheltered-castle-37414.herokuapp.com/api/posts/${_id}`);
    dispatch({type: 'DELETE_MESSAGE', payload: _id});
  };
  render() {
      const { title, body, mood, _id, date } = this.props.message;
    return (
      <Consumer>
        {value => {
          const { dispatch } = value;
          return(

            <div className="row mt-5 mb-5 pb-5 pt-5">
              <div className="col-12 text-center border-bottom pb-3 mb-3 border-color"><h2 style={{color: '#233443'}}>{title}</h2></div>
              <div className="col-md-3 col-sm-12 border-right mr-5 text-center border-color text-color fix-small-border">{mood}<br/>{moment(date).format('DD/MM/YYYY')}</div>
              <div className="col text-color body-phone-text">{body}</div>
            </div>

          )
        }}
      </Consumer>
    )
  }
}

Message.propTypes = {
  message: PropTypes.object.isRequired,
}

export default Message;
