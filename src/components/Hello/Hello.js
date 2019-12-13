import React from 'react';
import { Redirect } from 'react-router-dom';

import './Hello.css';

/*const Hello = () => {
  return <main>Hello</main>
};*/

class Hello extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    console.log('Hello mounted');
  }

  render() {
    const {loggedIn} = this.props;
    
    if (loggedIn) {
      return <Redirect to='/chat-window'/>;
    }
    
    return (
      <main className='main'>
        <h2>Welcome to RSS-Chat</h2>
        <p>
          You can go to registration or the login form.
        </p>
      </main>
    );
  }
}

export default Hello;