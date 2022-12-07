import { useContext,  useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";
import { Header } from "../homePage/Header";
import { PreFooter } from "../homePage/PreFooter";
import "./ProfilePage.css"
import { motion } from "framer-motion";


export function ProfilePage() {
    const { auth } = useContext(AuthContext)
    const navigate = useNavigate();

    const [ username, setUsername ] = useState(auth.user.username)
    const [ password, setPassword ] = useState(auth.user.password)
    const [ email, setEmail ] = useState(auth.user.email)
    const [ confirmPassword, setConfirmPassword] = useState(auth.user.confirmPassword)

    const [ passwordError, setPasswordError ] = useState('')
    const [ emailError, setEmailError ] = useState('')
    const [ usernameError, setUsernameError ] = useState('')

    function changeUsername(event) {
        setUsername(event.target.value)
    }

    function changePassword(event) {
        setPassword(event.target.value)
        setConfirmPassword(event.target.value)
    }

    function changeEmail(event){
        setEmail(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        setEmailError('');
        setPasswordError('');
        setUsernameError('');
    
        const emailValid = validateEmail(email)
    
        const passwordValid = validatePassword(confirmPassword);
        
        const usernameValid = validateUsername(username);
    
        if (!emailValid || !passwordValid || !usernameValid) {
            return ;
        }
  
    const body = {
      username : username,
      password : password,
      email : email,
      confirmPassword : confirmPassword
    };

    fetch(`http://localhost:3001/users/${auth.user.id}` ,{
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    } )
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


function validateUsername(username){
  const specialCharacterList = [
    '!', '@', '#', '$', '%', '^', '&', '*'
  ];

  function constainsNumber(str){
    return /\d/.test(str)
  }

    if(!(username.length <=15)){
        setUsernameError("Usernames need to have 15 characters or less!")

      return false
    }

    for(let letter of username){

   if(specialCharacterList.includes(letter)){
      setUsernameError("Username cannot contain special characters")

      return false
  }

  if(constainsNumber(username)){
    setUsernameError("Username cannot contain numbers!")

    return false
  }
}

  return true;
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

function deleteAccount(event) {
    event.preventDefault()

    fetch(`http://localhost:3001/users/${auth.user.id}`, {
        method: "DELETE"
    })

    navigate('/login')
}

const [modalDeleteButton, setModalDeleteButton] = useState(false);

const toggleModalDeleteButton = () => {
  setModalDeleteButton(!modalDeleteButton)
};

if(modalDeleteButton) {
  document.body.classList.add('active-modal')
} else {
  document.body.classList.remove('active-modal')
};

const [modalSubmitButton, setModalSubmitButton] = useState(false);

const toggleModalSubmitButton = () => {
  setModalSubmitButton(!modalSubmitButton)
};

if(modalSubmitButton) {
  document.body.classList.add('active-modal')
} else {
  document.body.classList.remove('active-modal')
};

    return (
        <>
        <Header />
            <h1 className="profilePageh1">{auth.user.username}'s Profile Page</h1>
            <section className="profilePageSection">
            
            <div className="profilePageSection_divL">
              
              <h2>Informations regarding profile changes!</h2>
              
              <p>If you wish to edit your profile credentials, change the fields to what your new credentials want to be, after that, click the "EDIT" button, then, you need to confirm your new credentials, and that is it! You are good to go!</p>
              
              <p>After confirmation, you will be redirected to the login page in order to log in with your NEW credentials!</p>

            </div>
            
            <div className="profilePageSection_div">
                <form onSubmit={handleSubmit}>
                    
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" defaultValue={auth.user.username} onChange={changeUsername}></input>

                        <label htmlFor="email">Email</label>
                        <input type="text" id="email" defaultValue={auth.user.email} onChange={changeEmail}></input>

                        <label htmlFor="password">Password</label>
                        <input type="text" id="password" defaultValue={auth.user.confirmPassword} onChange={changePassword}></input>

                </form>
                
                <button type="button" onClick={toggleModalSubmitButton}> Edit </button>
                <button onClick={toggleModalDeleteButton}>Delete</button>
            </div>



                {modalSubmitButton && (
                    <motion.div
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}
                    className="modal">
                        <div onClick={toggleModalSubmitButton} className="overlay"></div>
                    <div className="modal-content modal3">
                    <div>
                        <h1>These will be your new credentials!</h1>
                    </div>

                        <p>Your new username: {username}</p>
                        <p>{usernameError}</p>
                        <p>Your new email: {email}</p>
                        <p className="profileError">{emailError}</p>
                        <p>Your new password: {confirmPassword}</p>
                        <p className="profileError">{passwordError}</p>

                    <div className="modal3ButtonsWrapper"> 
                      <div className="modal3Buttons">
                        <button type="submit" onClick={handleSubmit} >Confirm</button>
                        <button onClick={toggleModalSubmitButton}>Cancel</button>
                      </div>
                    </div>
                    </div>

                    </motion.div>
                )}


                {modalDeleteButton && (
                  <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="modal">
                  <div onClick={toggleModalDeleteButton} className="overlay"></div>
                    <div className="modal-content modal3">
                    <div>
                        <h1>Do you REALLY want to delete your account?</h1>
                        <h3>We will miss you if you do that!</h3>
                    </div>

                    <div className="modal3Buttons"> 
                        <button onClick={deleteAccount}>Delete</button>
                        <button onClick={toggleModalDeleteButton}>Cancel</button>
                    </div>
                    </div>
                </motion.div>
                )}
            </section>
        <PreFooter />
        </>
    )
}