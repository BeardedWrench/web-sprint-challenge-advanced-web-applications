import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import axiosWithAuth from '../utils/axiosWithAuth';

const initCreds = {
  username: '',
  password: '',
}
const initError = {
  error: ''
}
const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [ creds, setCreds ] = useState( initCreds )
  const [ error, setError ] = useState( initError );

  const history = useHistory();

  const handleChange = e => {
    setCreds({
      ...creds,
      [e.target.name]: e.target.value
    })
  }
  const login = e => {
    e.preventDefault();
    axiosWithAuth().post('/login', creds)
      .then( res => {
        localStorage.setItem( 'token', JSON.stringify( res.data.payload ) );
        history.push('/bubble')
      })
      .catch( err => {
        setError({ error: 'Username or Password not valid.' } );
      })
  }
  return (
    <>
      <h1>
        Welcome to the Bubble App!
        <p>Build a login page here</p>
      </h1>
      <form onSubmit={ login }>
        <label>Username: <input type="text" name="username" onChange={handleChange} value={creds.username}/></label>
        <label>Password: <input type="password" name="password" onChange={handleChange} value={creds.password}/></label>
        <p style={ { color: 'red', fontSize: '16px' } }>{ error.error }</p>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.