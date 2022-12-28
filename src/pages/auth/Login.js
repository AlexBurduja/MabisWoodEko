import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import { AnimatePresence, motion } from "framer-motion";
import './loginCss.css'
import logo from "../../publicResources/logoMabis.svg"
import { AiOutlineEye } from "react-icons/ai"
import ParticlesBackground from "../../particlesJS/particleJsComponent";

export function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const [errorMsg, setErrorMsg] = useState('')

    const { auth, setAuth } = useContext(AuthContext)

    const [passwordShow, setPasswordShow] = useState(false)
    const togglePassword = () => {
      setPasswordShow(!passwordShow)
    }

    const navigate = useNavigate();

    function passwordChangeHandler(event){
        setPassword(event.target.value)
    }

    function emailChangeHandler(event){
        setEmail(event.target.value)
    }

    function onSubmit(event){
        event.preventDefault();
        setEmailError('');
        setPasswordError('');

        const emailValid = validateEmail(email)

        const passwordValid = validatePassword(password);

        if (!emailValid || !passwordValid){
            return;
        }
         
        const body = {
            email,
            password
        };


        fetch(`http://localhost:3001/login`, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(body)
        })
        .then(response => {
          if (response.status === 400){
            setErrorMsg('Email or Password is incorrect!')
            
            setTimeout(() =>{
              setErrorMsg('')
            }, 2000)

            throw new Error('invalid credentials');

          } return response
        })
        .then(response => response.json())
        .then(response => setAuth(response))
        .then( () => navigate("/"))
  };
    

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
      <>
      <ParticlesBackground />
      <section className="loginWrapper">
        <AnimatePresence>
          {errorMsg && (
            <motion.h1
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity:0}}
            transition={{ease: "easeInOut", duration:2}}
            className="errorMsgAccNotFound"
            >
              {errorMsg}
            </motion.h1>
          )}
        </AnimatePresence>
        <div className="wrapperOfWrapper">

        <div className="leftRegion">

        <div>
          <img className="loginLogo" src={logo}></img>
        </div>

        <div>
          <p>Welcome!</p>
        </div>

        <div>
          Log in to have full access!
        </div>

        <div>
          <p>www.mabiswoodeko.com</p>
        </div>
          
        </div>

            <form onSubmit={onSubmit} className="loginForm" noValidate>

          <h1>Log in</h1>

                <div className="inputBoxes">
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
                
                <div>
                </div>

                <motion.button 
                type="submit"
                className="submitButtonLogin"
                whileHover={{scale: 0.99}}
                whileTap={{scale:0.9}}
                >
                    Login
                  </motion.button>

            <div>
                Don't have an account? <Link to="/register">Register</Link>
            </div>
            </form>
        </div>
      </section>
    </>
    )
}