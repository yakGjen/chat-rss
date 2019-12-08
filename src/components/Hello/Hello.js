import React from 'react';

import './Hello.css';

/*const Hello = () => (
  <main>Hello</main>
);*/

class Hello extends React.Component {
  componentDidMount() {
    console.log('Hello mounted');
  }

  render() {
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