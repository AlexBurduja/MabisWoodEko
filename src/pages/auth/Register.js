import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../App';
import "./Register.css"
import { motion } from 'framer-motion';
import { AiOutlineEye } from 'react-icons/ai';
import ParticlesBackground from '../../particlesJS/particleJsComponent';



export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName ] = useState('')
  const [lastName, setLastName ] = useState('')

  
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const { auth, setAuth } = useContext(AuthContext);

  const [passwordShow, setPasswordShow] = useState(false)
  
  const togglePassword = () => {
    setPasswordShow(!passwordShow)    
  }

  const navigate = useNavigate();

  function onSubmits(event) {
    event.preventDefault();
    setEmailError('');
    setPasswordError('');

    const emailValid = validateEmail(email)

    const passwordValid = validatePassword(password);

    if (!emailValid || !passwordValid){
        return;
    }
    
    const body = {
      firstName: firstName,
      lastName: lastName,
      username : username,
      email : email,
      password : password,
      confirmPassword : password
    };

    fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then((response) => response.json())

    
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

  function firstNameChangeHandler(event){
    setFirstName(event.target.value)
  }

  function lastNameChangeHandler(event){
    setLastName(event.target.value)
  }

  function validateEmail(email){
    // eslint-disable-next-line no-control-regex
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

    const emailValid = emailRegex.test(email);

    if(!emailValid){
        setEmailError("Please enter a valid email");
    }

    return emailValid;
}

function validatePassword(password) {
  const specialCharacterList = [
    '!', '@', '#', '$', '%', '^', '&', '*'
  ];

  if (!(password.length >= 6)) {
    setPasswordError('Password must contain at least 6 characters');

    return false;
  }

  let hasUpperCaseCharacter = false;
  let hasNumberCharacter = false;
  let hasSpecialCharacter = false;

  for (let letter of password) {
    if (
      !specialCharacterList.includes(letter) 
      && Number.isNaN(Number(letter)) 
      && letter === letter.toUpperCase()
    ) {
      hasUpperCaseCharacter = true;
    }

    if (typeof Number(letter) === 'number') {
      hasNumberCharacter = true;
    }

    if (specialCharacterList.includes(letter)) {
      hasSpecialCharacter = true;
    }
  }

  if (!hasUpperCaseCharacter) {
    setPasswordError('Your password must have at least one upper case character');
  }

  if (!hasNumberCharacter) {
    setPasswordError('Your password must include at least one number');
  }

  if (!hasSpecialCharacter) {
    setPasswordError('Your password must include at least one special character');
  }

  if (hasUpperCaseCharacter && hasNumberCharacter && hasSpecialCharacter) {
    return true;
  }

  return false;
}

function Register(){
  <div className='registerWrapper'>
  <form className='registerForm' onSubmit={onSubmits}>
    <h1>Register</h1>

      <div className="inputBoxes">
        <input id="firstName" type="text" onChange={firstNameChangeHandler} required></input>
        <span htmlFor='firstName'>First name</span>
      </div>

      <div className="inputBoxes">
        <input id="lastName" type="text" onChange={lastNameChangeHandler} required></input>
        <span htmlFor='lastName'>Last name</span>
      </div>

      <div className="inputBoxes">
        <input id="username" type="text" onChange={usernameChangeHandler} required></input>
        <span htmlFor='username'>Username</span>
      </div>

      <div className='inputBoxes'>
          <input id="email" type="text" onChange={emailChangeHandler} required></input>
          <span>Email</span>
          <p className="error">{emailError}</p>
      </div>

      <div className="inputBoxes">
          <input id="password" type={passwordShow ? "text" : "password"} onChange={passwordChangeHandler} required></input>
          <span>Password</span>
          <p className="error">{passwordError}</p>
          <p className="eyeIcon" onClick={togglePassword}><AiOutlineEye/></p>
        </div>

        <motion.button 
                type="submit"
                className="submitButtonRegister"
                whileHover={{scale: 1.2}}
                whileTap={{scale:0.9}}
                >
                    Register
          </motion.button>

          <p>Already have an account? <Link to="/login">Login</Link></p>
    </form>
</div>
}


  return (
<div className='registerWrapper'>
<ParticlesBackground />
  <form className='registerForm' onSubmit={onSubmits}>
    <h1>Register</h1>

      <div className="inputBoxes">
        <input id="firstName" type="text" onChange={firstNameChangeHandler} required></input>
        <span htmlFor='firstName'>First name</span>
      </div>

      <div className="inputBoxes">
        <input id="lastName" type="text" onChange={lastNameChangeHandler} required></input>
        <span htmlFor='lastName'>Last name</span>
      </div>

      <div className="inputBoxes">
        <input id="username" type="text" onChange={usernameChangeHandler} required></input>
        <span htmlFor='username'>Username</span>
      </div>

      <div className='inputBoxes'>
          <input id="email" type="text" onChange={emailChangeHandler} required></input>
          <span>Email</span>
          <p className="error">{emailError}</p>
      </div>

      <div className="inputBoxes">
          <input id="password" type={passwordShow ? "text" : "password"} onChange={passwordChangeHandler} required></input>
          <span>Password</span>
          <p className="error">{passwordError}</p>
          <p className="eyeIcon" onClick={togglePassword}><AiOutlineEye/></p>
        </div>

        <motion.button 
                type="submit"
                className="submitButtonRegister"
                whileHover={{scale: 1.1}}
                whileTap={{scale:0.9}}
                >
                    Register
          </motion.button>

          <p>Already have an account? <Link to="/login">Login</Link></p>
    </form>
</div>
  );
}
