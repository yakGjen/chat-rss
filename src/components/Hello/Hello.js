import React from 'react';

import './Hello.css';

/*const Hello = () => (
  <main>Hello</main>
);*/

class Hello extends React.Component {
  componentDidMount() {
    console.log('Hello mounted');
    console.log(localStorage);
  }

  render() {
    return (
      <main>Hello</main>
    );
  }
}

export default Hello;