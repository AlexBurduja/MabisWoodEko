import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../../App';
import "./Register.css"
import { motion } from 'framer-motion';
import { AiOutlineEye } from 'react-icons/ai';
import ParticlesBackground from '../../particlesJS/particleJsComponent';
import { FirebaseAuthContext } from '../../FirebaseAuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase-config';
import { doc, setDoc } from 'firebase/firestore';



export function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName ] = useState('')
  const [lastName, setLastName ] = useState('')

  const [registerEmail , setRegisterEmail] = useState('')
  const [registerPassword , setRegisterPassword] = useState('')
  const [ sex, setSex] = useState('')
  const [ phoneNumber, setPhoneNumber] = useState('')
  const [ address, setAddress] = useState('')
  const [name , setName] = useState('')

  
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const { user } = useContext(FirebaseAuthContext)

  const [passwordShow, setPasswordShow] = useState(false)
  
  const togglePassword = () => {
    setPasswordShow(!passwordShow)    
  }

  const navigate = useNavigate();

  const now = new Date();
  let minutes = now.getMinutes()

  minutes = minutes.toString().padStart(2, '0')

  let date = now.getDate()
  
  date = date.toString().padStart(2, '0')

  let month = now.getMonth() + 1

  month = month.toString().padStart(2, '0')


  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth, 
        registerEmail , 
        registerPassword
        );

        await setDoc(doc(db, "users", user._tokenResponse.localId), {
          firstName : firstName,
          lastName : lastName,
          phoneNumber : phoneNumber,
          address : address,
          sex : sex,
          admin: false, 
        })
    } catch (error) {
      console.log(error.message)
    }
  }

  function saveFirstName(event){
    setFirstName(event.target.value)
  }

  function saveLastName(event){
    setLastName(event.target.value)
  }

  function saveSex(event){
    setSex(event.target.value)
  }

  function savePhone(event){
    setPhoneNumber(event.target.value)
  }

  function saveAddress(event){
    setAddress(event.target.value)
  }

  function saveEmail (event) {
    setRegisterEmail(event.target.value)
  }

  function savePassword (event) {
    setRegisterPassword(event.target.value)
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

  return (
<section className='registerWrapper'>
<ParticlesBackground />

<div className='registerRightSide'>
    
    <h1>Register</h1>

  <form className='registerForm' onSubmit={register}>

      <div className="inputBoxes">
        <input id="firstName" type="text" onChange={saveFirstName} required></input>
        <span htmlFor='firstName'>First name</span>
      </div>

      <div className="inputBoxes">
        <input id="lastName" type="text" onChange={saveLastName} required></input>
        <span htmlFor='lastName'>Last name</span>
      </div>

      <div className="inputBoxes">
        <input id="username" type="text" onChange={savePhone} required></input>
        <span htmlFor='username'>Phone No.</span>
      </div>

      <div className="inputBoxes">
        <input id="username" type="text" onChange={saveAddress} required></input>
        <span htmlFor='username'>Address</span>
      </div>

      <div className='inputBoxes'>
          <input id="email" type="text" onChange={saveEmail} required></input>
          <span>Email</span>
          <p className="error">{emailError}</p>
      </div>

      <div className="inputBoxes">
          <input id="password" type={passwordShow ? "text" : "password"} onChange={savePassword} required></input>
          <span>Password</span>
          <p className="error">{passwordError}</p>
          <p className="eyeIcon" onClick={togglePassword}><AiOutlineEye/></p>
      </div>

      <section className='sexRadioButton'>
        <div>

        <input type="radio" id='sex' name='sex' value="M"></input>
          <label for="sex">M</label>
        </div>

        <div>
        <input type="radio" id='sex' name='sex' value="F"></input>
          <label for="sex">F</label>
        </div>
      </section>

        <motion.button 
                type="submit"
                className="submitButtonRegister"
                whileHover={{scale: 1.1}}
                whileTap={{scale:0.9}} >
                    Register  
          </motion.button>

    </form>
          <p className='alreadyLoginP' >Already have an account? <Link to="/login">Login</Link></p>
  </div>
  </section>
  );
}
