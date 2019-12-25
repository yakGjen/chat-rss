import React, { Component } from 'react';

import './DownButton.css';

/*const DownButton = (props) => (
  <div className='button-down'>
    <i className="fas fa-level-down-alt"></i>
  </div>
);*/

class DownButton extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      className: 'button-down'
    }
    //this.className = 'button-down';
  }
  
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.props.messagesWindow.addEventListener('scroll', this.handleScroll);
  }
  
  handleScroll = (event) => {
    const elem = event.target;
    const fullScrollTop = elem.scrollHeight - elem.clientHeight;
    if (elem.scrollTop < fullScrollTop) {
      this.setState({className: 'button-down button-down-show'});
    } else {
      this.setState({className: 'button-down'});
    }
  }
  
  scrollDown = () => {
    this.props.messagesWindow.scrollTo({
      top: this.props.messagesWindow.scrollHeight,
      behavior: "smooth",
    });
  }
  
  render() {
    return (
      <div className={this.state.className} onClick={this.scrollDown}>
        <i className="fas fa-level-down-alt"></i>
      </div>
    );
  }
}

export default DownButton;