import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";


export function Login(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const { auth, setAuth } = useContext(AuthContext)

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
        .then ((response) => response.json())
        .then ((response) => {
            setAuth(response);
            navigate('/')
        });
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
        <form onSubmit={onSubmit} noValidate>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" onChange={emailChangeHandler}></input>
                <p>{emailError}</p>
            </div>


            <div>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" onChange={passwordChangeHandler}></input>
                <p>{passwordError}</p>
            </div>

            <button type="submit">
                Login
            </button>

            <Link to="/register">Register</Link>
        </form>
    )
}