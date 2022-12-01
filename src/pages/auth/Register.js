import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';



export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const { auth, setAuth } = useContext(AuthContext);

  const navigate = useNavigate();

  function onSubmits() {
    const body = {
      email : email,
      password : password,
      username : username
    };

    fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      });
    
      navigate("/login")
  }

  function passwordChangeHandler(event){
    setPassword(event.target.value)
  }

  function emailChangeHandler(event){
    setEmail(event.target.value)
  }

  function usernameChangeHandler(event){
    setUsername(event.target.value)
  }

  return (
    <form onSubmit={onSubmits}>
      <div>
        <label htmlFor='username'>Username</label>
        <input id="username" type="text" onChange={usernameChangeHandler}></input>
      </div>


      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" onChange={emailChangeHandler}></input>
      </div>


      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" onChange={passwordChangeHandler}></input>
      </div>

      <button type='submit'>Register</button>
    </form>
  );
}
