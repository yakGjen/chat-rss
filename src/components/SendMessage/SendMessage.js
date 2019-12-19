import React, { Component } from 'react';

import './SendMessage.css';

/*const SendMessage = ({handleInputValue, sendMessage}) => (
  <div className='send-message'>
    <textarea className='send-message-field' name="" id="" cols="30" rows="10"  onChange={(e) => handleInputValue(e)}></textarea>
    <button onClick={sendMessage} className='send-message-button'>Send</button>
  </div>
);*/

class SendMessage extends Component {
  constructor(props) {
    super(props);
  }
  
  sendValue = (event) => {
    event.target.blur();
    const {sendMessage} = this.props;

    if (!this.textArea.value.trim()) {
      this.textArea.value = '';
      return;
    }
    
    sendMessage();
    this.textArea.value = '';
  }
  
  render() {
    const {handleInputValue} = this.props;
    
    return (
      <div className='send-message'>
        <textarea
          className='send-message-field'
          id="messageField"
          cols="30"
          rows="10"
          onChange={handleInputValue}
          ref={(elem) => this.textArea = elem}
        ></textarea>
        <button onClick={this.sendValue} className='send-message-button'>Send</button>
      </div>
    );
  }
}

export default SendMessage;