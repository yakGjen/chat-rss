import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './ChatWindow.css';
import SendMessage from "../SendMessage/SendMessage";

import DownButton from "../DownButton/DownButton";


class ChatWindow extends Component {
  constructor(props) {
    super(props);
    
    this.elem = null;
  }

  componentDidMount() {
    this.props.scrollDown(this.elem);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.scrollDown(this.elem);
  }

  render() {
    const {loggedIn, data, sendMessage, handleInputValue} = this.props;
    
    if (loggedIn === false) {
      return <Redirect to='/auth'/>;
    }
    
    return (
      <main>
        Chat Window
        <div className='main-content-messages' ref={(node) => this.elem = node}>
          {data.map((item, index) => (
            <div className='message-card' key={index}>
              <h3 className='message-card-name'>Name: {item.from}</h3>
              <p className='message-card-text'>{item.message}</p>
              <div className='message-date'>
                <p>{`Time: ${new Date(item.time).getHours()}:${new Date(item.time).getMinutes()}:${new Date(item.time).getSeconds()}`}</p>
                <p>{`Date: ${new Date(item.time).getDate()}.${new Date(item.time).getMonth() + 1}.${new Date(item.time).getFullYear()}`}</p>
              </div>
            </div>
          ))}
          <DownButton messagesWindow={this.elem}/>
        </div>
        <SendMessage sendMessage={sendMessage} handleInputValue={handleInputValue}/>
      </main>
    );
  }
}

export default ChatWindow;