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
    console.log('App did mounted');
    
    this.downloadLocalStorage();
    
    window.addEventListener('unload', () => {
      if (this.state.loggedIn) {
        localStorage.setItem('activeUser', this.state.user);
        localStorage.setItem(this.state.user, JSON.stringify(this.state));
      }
    });
    
    /*if (this.state.loggedIn) {
      this.props.history.push('/chat-window');
    }*/
  }
  
  /*
  sort in stage of download data
   */
  
  downloadLocalStorage = () => {
    const activeUser = localStorage.getItem('activeUser');
    
    if (activeUser) {
      const storageState = JSON.parse(localStorage.getItem(activeUser));
      
      this.setState(storageState);
      
      // this.handleDataInBackground();
      this.openConnection();
      this.setSoketHandlers();
    
      console.log('localstorage runned with credentials');
    } else {
      console.log('localstorage is empty');
    }
  }
  
  /*
  if user has reloaded page without log out
   */
  /*handleDataInBackground = () => {
    this.logIn('', '');
  }*/
  
  openConnection = () => {
    this.soket = new WebSocket('ws://st-chat.shas.tel');
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
    console.log('close');
    
    // localStorage.setItem(this.state.user, JSON.stringify(this.state));
    this.setState( Object.assign({}, this.state, {data: []}) );
  }

  // save users data in localeStorage
  closeConnection = () => {
    if (this.state.loggedIn === true) {
      console.log('close connection');
      this.setState(Object.assign({}, this.state, {loggedIn: false, log: 'Log In'}));
      this.soket.close();
      localStorage.clear();
    }
  }
  
  handleData = (event) => {
    console.log('handle data');
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
    console.log('send');
    this.soket.send(JSON.stringify({
      from: 'Evgen',
      message: this.state.inputValue,
    }));
  }

  handleInputValue = (event) => {
    console.log('input', event.target.value);
    this.setState(Object.assign({}, this.state, {inputValue: event.target.value}));
  }

  logIn = (loginValue, passwordValue) => {
    if (loginValue === '' && passwordValue === '') {
      // this.setState({user: 'Evgen'});
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
    console.log('scroll');
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
