import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';

import Layout from "./Layout";
import Hello from "./Hello/Hello";
import Auth from "./Auth/Authentification";
import Registration from "./Registration/Registration";
import ChatWindow from "./ChatWindow/ChatWindow";


class App extends Component {
  constructor(props) {
    super(props);

    this.soket = new WebSocket('ws://st-chat.shas.tel');

    this.state = {
      loggedIn: false,
      log: 'Log In',
      data: [{
        from: 'me',
        message: 'bla',
      }],
      inputValue: '',
    };
    this.logIn = this.logIn.bind(this);
    this.handleOpenConnection = this.handleOpenConnection.bind(this);
    this.handleCloseConnection = this.handleCloseConnection.bind(this);
    this.closeConnection = this.closeConnection.bind(this);
    this.handleData = this.handleData.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleInputValue = this.handleInputValue.bind(this);

    this.scrollDown = this.scrollDown.bind(this);
  }

  componentWillUnmount() {
    localStorage.setItem('true', 'yes');
  }

  componentDidMount() {
    console.log('App did mounted');
    this.soket.onopen = this.handleOpenConnection;
    this.soket.onclose = this.handleCloseConnection;
    this.soket.onerror = this.soketError;

    if (localStorage.length > 0) {
      const storageState = JSON.parse(localStorage.getItem('data'));

      if (storageState.loggedIn) {
        console.log('localStorage run');
        this.setState(JSON.parse(localStorage.getItem('data')));
      }

      //this.setState(JSON.parse(localStorage.getItem('data')));
    } else {
      console.log('localstorage is empty');
    }
    console.log(this.state);
  }

  handleOpenConnection() {
    console.log('open');
  }

  handleCloseConnection(event) {
    console.log('close');
    //this.setState(Object.assign({}, this.state, {loggedIn: false, log: 'Log In'}));
    console.log('record in localStorage');
    localStorage.clear();
    localStorage.setItem('data', JSON.stringify(this.state));
  }

  handleData(event) {
    console.log('handle data');
    this.setState(Object.assign({}, this.state, {data: [...this.state.data, ...JSON.parse(event.data)]}));
  }

  // save users data in localeStorage
  closeConnection() {
    if (this.state.loggedIn === true) {
      console.log('close button');
      this.soket.close();
      this.setState(Object.assign({}, this.state, {loggedIn: false, log: 'Log In'}));
    }
  }

  sendMessage() {
    console.log('send');
    this.soket.send(JSON.stringify({
      from: 'Evgen',
      message: 'Test message',
    }));
  }

  handleInputValue(event) {
    console.log('input', event.target.value);
    this.setState(Object.assign({}, this.state, {inputValue: event.target.value}))
  }

  logIn(loginValue, passwordValue) {
    console.log('Log In');
    if (loginValue === '' && passwordValue === '') {
      if (this.state.loggedIn === false) {
        this.setState(Object.assign({}, this.state, {loggedIn: true, log: 'Log Out'}));
      }
      this.soket.onmessage = this.handleData;
    } else {
      console.log('error');
    }
    console.log(this.state);
  }

  scrollDown(elem) {
    console.log('scroll');
    elem.scrollTo(0, elem.scrollHeight);
  }

  render() {
    return (
      <div className="app">
        <Layout log={this.state.log} closeConnection={this.closeConnection}>
          <Switch>
            <Route path='/auth' render={() => <Auth logIn={this.logIn}/>} />
            <Route path='/registration' component={Registration} />
            <Route path='/chat-window' render={() => <ChatWindow scrollDown={this.scrollDown} data={this.state.data} sendMessage={this.sendMessage} loggedIn={this.state.loggedIn} handleInputValue={this.handleInputValue}/>} />
            <Route path='/' component={Hello} />
          </Switch>
        </Layout>
      </div>
    );
  };
}

export default App;
