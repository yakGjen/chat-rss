import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';

import './Authentification.css';


class Authentification extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginValue: '',
      passwordValue: '',
    };
  }

  handleUpdateLogin = (event) => {
    this.setState({loginValue: event.target.value});
  }

  handleUpdatePassword = (event) => {
    this.setState({passwordValue: event.target.value});
  }

  ctrlForm = (event) => {
    event.preventDefault();
  }

  render() {
    const {logIn, loggedIn} = this.props;
    
    if (loggedIn) {
      return <Redirect to='/chat-window'/>;
    }
    
    return (
      <main className='main'>
        <h2 className='auth-header'>Authentification</h2>
        <p>This is test authentification page! You don't need to enter login and password.</p>
        <form className='auth-form' onSubmit={this.ctrlForm}>
          <label className='input' htmlFor="login">
            Login:
            <input id='login' type="text" className='input-field' value={this.state.loginValue} onChange={this.handleUpdateLogin}/>
          </label>
          <label className='input' htmlFor="password">
            Password:
            <input id='password' type="password" className='input-field' value={this.state.loginPassword} onChange={this.handleUpdatePassword}/>
          </label>
          <Link to='/chat-window' exact='false' className='auth-button'>
            <button className='auth-btn' onClick={() => logIn(this.state.loginValue, this.state.passwordValue)}>Войти</button>
          </Link>
        </form>
      </main>
    );
  }
}

export default Authentification;