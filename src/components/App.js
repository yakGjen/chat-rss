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

    // this.soket = new WebSocket('ws://st-chat.shas.tel');
    this.soket = null;
    
    // this.openConnection();

    this.state = {
      user: '',
      loggedIn: false,
      log: 'Log In',
      data: [/*{
        from: 'me',
        message: 'bla',
      }*/],
      inputValue: '',
    };
  }

  componentDidMount() {
    this.downloadLocalStorage();
    
    window.addEventListener('unload', () => {
      if (this.state.loggedIn) {
        localStorage.setItem('activeUser', this.state.user);
        localStorage.setItem(this.state.user, JSON.stringify(this.state));
      }
    });
  }
  
  /*
  sort in stage of download data
   */
  
  downloadLocalStorage = () => {
    const activeUser = localStorage.getItem('activeUser');
    
    if (activeUser) {
      const storageState = JSON.parse(localStorage.getItem(activeUser));
      
      this.setState(storageState);
      
      this.openConnection();
      this.setSoketHandlers();
      
    } else {
      console.log('localstorage is empty');
    }
  }
  
  openConnection = () => {
    try {
      this.soket = new WebSocket('ws://st-chat.shas.tel');
    } catch (e) {
      alert('chat uses the websocket connection that is not used this hosting');
      console.log('Error', e);
    }
  }
  
  setSoketHandlers = () => {
    this.soket.onopen = this.handleOpenConnection;
    this.soket.onclose = this.handleCloseConnection;
    this.soket.onmessage = this.handleData;
    this.soket.onerror = this.soketError;
  }

  handleOpenConnection = () => {
    console.log('open connection');
  }

  handleCloseConnection = (event) => {
    this.setState( Object.assign({}, this.state, {data: []}) );
  }

  // save users data in localeStorage
  closeConnection = (event) => {
    event.target.blur();
    if (this.state.loggedIn === true) {
      this.setState(Object.assign({}, this.state, {loggedIn: false, log: 'Log In'}));
      this.soket.close();
      localStorage.clear();
    }
  }
  
  handleData = (event) => {
    const inputData = JSON.parse(event.data);
    
    if (inputData.length > 1) {
      const sortedData = this.sortInputData(inputData);
      this.setState(Object.assign({}, this.state, {data: [...this.state.data, ...sortedData]}));
    } else {
      this.setState(Object.assign({}, this.state, {data: [...this.state.data, ...JSON.parse(event.data)]}));
    }
  }
  
  sortInputData = (data) => {
    const sortedData = data.filter((item) => {
      if (!this.state.data.length) {
        return false;
      }
      if (item.time > this.state.data[this.state.data.length - 1].time) {
        return true;
      }
    });
    
    if (sortedData.length) {
      return sortedData.sort((a, b) => a.time - b.time);
    } else {
      return data.sort((a, b) => a.time - b.time);
    }
  }
  
  soketError = () => {
    console.log('error in connection');
  }

  sendMessage = () => {
    this.soket.send(JSON.stringify({
      from: 'Test-User',
      message: this.state.inputValue,
    }));
  }

  handleInputValue = (event) => {
    this.setState(Object.assign({}, this.state, {inputValue: event.target.value}));
  }

  logIn = (loginValue, passwordValue) => {
    if (loginValue === '' && passwordValue === '') {
      this.openConnection();
      this.setSoketHandlers();
      
      setTimeout(() => {
        this.setState(Object.assign({}, this.state, {user: 'Evgen'}));
      }, 0);
      
      
      if (this.state.loggedIn === false) {
        this.setState(Object.assign({}, this.state, {loggedIn: true, log: 'Log Out'}));
      }
      
    } else {
      console.log('error');
    }
  }

  scrollDown = (elem) => {
    if (!elem) return;
    elem.scrollTo(0, elem.scrollHeight);
  }

  render() {
    return (
      <div className="app">
        <Layout log={this.state.log} closeConnection={this.closeConnection}>
          <Switch>
            <Route path='/auth' render={() => <Auth loggedIn={this.state.loggedIn} logIn={this.logIn}/>} />
            <Route path='/registration' component={Registration} />
            <Route path='/chat-window' render={() => <ChatWindow scrollDown={this.scrollDown} data={this.state.data} sendMessage={this.sendMessage} loggedIn={this.state.loggedIn} handleInputValue={this.handleInputValue}/>} />
            <Route path='/' component={() => <Hello loggedIn={this.state.loggedIn}/>} />
          </Switch>
        </Layout>
      </div>
    );
  };
}

export default App;
