import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css"
import { AnimatePresence, motion } from 'framer-motion';
import { AiOutlineEye } from 'react-icons/ai';
import ParticlesBackground from '../../particlesJS/particleJsComponent';
import { FirebaseAuthContext } from '../../FirebaseAuthContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import PhoneInput from 'react-phone-number-input';
import { NavLink } from 'react-router-dom';



export function Register() {
  const [firstName, setFirstName ] = useState('')
  const [lastName, setLastName ] = useState('')

  const [registerEmail , setRegisterEmail] = useState('')
  const [registerPassword , setRegisterPassword] = useState('')
  const [ sex, setSex] = useState('')
  const [ phoneNumber, setPhoneNumber] = useState('')
  const [ address, setAddress] = useState('')

  
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [firstNameError, setFirstNameError] = useState('')
  const [phoneNumberError, setPhoneNumberError] = useState('')
  const [ succes, setSucces] = useState("")

  const [value, setValue] = useState()

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



  const register = async (event) => {
    event.preventDefault()
    setEmailError('')
    setPasswordError('')
    setLastNameError('')
    setFirstNameError('')
    setPhoneNumberError('')
    
    const emailValid = validateEmail(registerEmail)
    const passwordValid = validatePassword(registerPassword)
    const firstNameValid = validateFirstName(firstName)
    const lastNameValid = validateLastName(lastName)
    const phoneValid = validatePhoneNumber(phoneNumber)

    if(!emailValid || !passwordValid || !firstNameValid || !lastNameValid || !firstNameValid || !phoneValid){
      return;
    }


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

        setSucces("Account created! Now taking you to login!")

        setInterval(() => {
          navigate("/login")
        }, 2000)
    } catch (error) {
      console.log(error.message)
    }


  }

  function validateEmail(registerEmail){
    // eslint-disable-next-line no-control-regex
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

    const emailValid = emailRegex.test(registerEmail);

    if(!emailValid){
        setEmailError("Please enter a valid email");

        setInterval(() => {
    
          setEmailError("")
        
      }, 2000)
    }

    return emailValid;
}

function validatePassword(registerPassword) {
  const specialCharacterList = [
    '!', '@', '#', '$', '%', '^', '&', '*'
  ];

  if (!(registerPassword.length >= 6)) {
    setPasswordError('Password must contain at least 6 characters');

    setInterval(() => {
    
      setPasswordError("")
    
  }, 2000)

    return false;
  }

  let hasUpperCaseCharacter = false;
  let hasNumberCharacter = false;
  let hasSpecialCharacter = false;

  for (let letter of registerPassword) {
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
    
    setInterval(() => {
    
      setPasswordError("")
    
  }, 2000)
  }

  if (!hasNumberCharacter) {
    setPasswordError('Your password must include at least one number');

    setInterval(() => {
    
      setPasswordError("")
    
  }, 2000)
  }

  if (!hasSpecialCharacter) {
    setPasswordError('Your password must include at least one special character');

    setInterval(() => {
    
      setPasswordError("")
    
  }, 2000)
  }

  if (hasUpperCaseCharacter && hasNumberCharacter && hasSpecialCharacter) {
    return true;
  }

  return false;
}

function validateFirstName(firstLastName){
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
  
  if(firstLastName.match(/\d/)){
    setFirstNameError("First name can't contain numbers!")

    setInterval(() => {
    
      setFirstNameError("")
    
  }, 2000)

    return false
  } 
   if(specialChars.test(firstLastName)){
    setFirstNameError("First name can't contain special characters!")

    setInterval(() => {
    
      setFirstNameError("")
    
  }, 2000)

    return false
  }

  if(/[a-z]/.test(firstLastName.charAt(0))){
    setFirstNameError("First letter of your last name needs to be uppercase!")
    
  setInterval(() => {
    
      setFirstNameError("")
    
  }, 2000)

    return false
  }


    return true;
  }

function validateLastName(firstLastName){
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
  
  if(firstLastName.match(/\d/)){
    setLastNameError("Last name can't contain numbers!")

    setInterval(() => {
    setLastNameError("")
    }, 2000)
    return false
  } 
  
  if(specialChars.test(firstLastName)){
    setLastNameError("Last name can't contain special characters!")
    setInterval(() => {
      setLastNameError("")
      }, 2000)

    return false
  }

  if(/[a-z]/.test(firstLastName.charAt(0))){
    setLastNameError("First letter of your last name needs to be uppercase!")
    setInterval(() => {
      setLastNameError("")
      }, 2000)

    return false
  }


    return true;
  }

  function validatePhoneNumber(phoneNumber){
    if(phoneNumber.length > 10){
      setPhoneNumberError("Phone number can't be longer than 10 numbers!")

      setInterval(() => {
        setPhoneNumberError("")
      }, 2000)

      return false
    }

    return true;
  }


  return (
<>
<section className='registerWrapper'>
<ParticlesBackground />
<AnimatePresence>

{succes && (
  <motion.p 
  initial={{opacity:0}}
  animate={{opacity:1}}
  exit={{opacity:0}}
  transition={{ease:'easeIn' , duration:1}}
  className='registerSuccesMessage'
  >{succes}</motion.p>  
)}
  </AnimatePresence>
<div className='registerRightSide'>
    
    <h1>Register</h1>

  <section className='registerForm' >

      <div className="inputBoxes">
        <input id="firstName" type="text" onChange={saveFirstName} required></input>
        <span htmlFor='firstName'>First name</span>
        <AnimatePresence>
        {firstNameError && (
          <motion.p 
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          transition={{ease:'easeIn' , duration:1}}
          className='error'
          >{firstNameError}</motion.p>
        )}

        </AnimatePresence>
      </div>

      <div className="inputBoxes">
        <input id="lastName" type="text" onChange={saveLastName} required></input>
        <span htmlFor='lastName'>Last name</span>
        
        <AnimatePresence>
        {lastNameError && (
          <motion.p 
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          transition={{ease:'easeIn' , duration:1}}
          className='error'
          >{lastNameError}</motion.p>
        )}

        </AnimatePresence>
      </div>

      <div className="inputBoxes">
        <input id="username" type="number" onChange={savePhone} required></input>
        <span htmlFor='username'>Phone No.</span>
        <AnimatePresence>
        {phoneNumberError && (
          <motion.p 
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          transition={{ease:'easeIn' , duration:1}}
          className='error'
          >{phoneNumberError}</motion.p>
        )}

        </AnimatePresence>
      </div>

      <div className="inputBoxes">
        <input id="address" type="text" onChange={saveAddress} required></input>
        <span htmlFor='username'>Address</span>
      </div>

      <div className='inputBoxes'>
          <input id="email" type="text" onChange={saveEmail} required></input>
          <span htmlFor='email'>Email</span>
          <AnimatePresence>
        {emailError && (
          <motion.p 
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          transition={{ease:'easeIn' , duration:1}}
          className='error'
          >{emailError}</motion.p>
        )}

        </AnimatePresence>
      </div>

      <div className="inputBoxes">
          <input id="password" type={passwordShow ? "text" : "password"} onChange={savePassword} required></input>
          <span htmlFor="password">Password</span>
          <div className='errorContainer'>
          <AnimatePresence>
        {passwordError && (
          <motion.p 
          initial={{opacity:0}}
          animate={{opacity:1}}
          exit={{opacity:0}}
          transition={{ease:'easeIn' , duration:1}}
          className='error'
          >{passwordError}</motion.p>
          )}
        </AnimatePresence>
        </div>
          <p className="eyeIcon" onClick={togglePassword}><AiOutlineEye/></p>
      </div>

      <section className='sexRadioButton'>
        <div>
        <input type="radio" name='sex' value="Male" onChange={saveSex} ></input>M
        <input type="radio" name='sex' value="Female" onChange={saveSex} ></input>F
        </div>
      </section>

        <motion.button 
                className="submitButtonRegister"
                whileHover={{scale: 1.1}}
                whileTap={{scale:0.9}} 
                onClick={register}>
                    Register  
          </motion.button>

    </section>
          <p className='alreadyLoginP' >Already have an account? <NavLink to="/login">Login</NavLink></p>
  </div>
  </section>
  </>
  );
}
