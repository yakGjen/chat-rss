import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './ChatWindow.css';
import SendMessage from "../SendMessage/SendMessage";


class ChatWindow extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('chat mounted');
    console.log(this.props.data);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.scrollDown(this.elem);
  }

  render() {
    if (this.props.loggedIn === false) {
      return <Redirect to='/auth'/>
    }
    return (
      <main>
        Chat Window
        <div className='main-content-messages' ref={(node) => this.elem = node}>
          {this.props.data.map((item, index) => (
            <div className='message-card' key={index}>
              <h3 className='message-card-name'>Name: {item.from}</h3>
              <p className='message-card-text'>{item.message}</p>
            </div>
          ))}
        </div>
        <SendMessage sendMessage={this.props.sendMessage} handleInputValue={this.props.handleInputValue}/>
      </main>
    );
  }
}

export default ChatWindow;