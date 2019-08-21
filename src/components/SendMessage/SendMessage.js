import React, { Component } from 'react';

import './SendMessage.css';

const SendMessage = (props) => (
  <div className='send-message'>
    <input className='send-message-field' type="text" onChange={(e) => props.handleInputValue(e)}/>
    <button onClick={props.sendMessage} className='send-message-button'>Send</button>
  </div>
);

/*class SendMessage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleUpdateValue(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return (
      <div className='send-message'>
        <input className='send-message-field' type="text"/>
        <button onClick={this.props.sendMessage} className='send-message-button'>Send</button>
      </div>
    );
  }
}*/

export default SendMessage;