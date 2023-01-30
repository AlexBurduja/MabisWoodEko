import { useContext,  useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../App";
import { Header } from "../reusableComponents/Header";
import { PreFooter } from "../reusableComponents/PreFooter";
import "./ProfilePage.css"
import { AnimatePresence, motion } from "framer-motion";
import { FirebaseAuthContext } from "../../FirebaseAuthContext";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { Footer } from "../reusableComponents/Footer";


export function ProfilePage() {
    const { user } = useContext(FirebaseAuthContext)
    const navigate = useNavigate();

    const [ password, setPassword ] = useState(user.password)
    const [ email, setEmail ] = useState(user.email)
    
    const [ passwordError, setPasswordError ] = useState('')
    const [ emailError, setEmailError ] = useState('')
    const [ usernameError, setUsernameError ] = useState('')
    const [ firstNameError, setFirstNameError ] = useState('')
    const [ lastNameError, setLastNameError ] = useState('')
    
    const [succes, setSucces] = useState('');
    const [deleteMessage , setDeleteMessage] = useState('')
    
      const auth = getAuth()

      const triggetResetEmail = async () => {
        sendPasswordResetEmail(auth, email)
        
        toast.warn("Password reset sent!")
      }
      
    
    
    useEffect(() => {
      if(user?.uid){
        const getDocument = async () => {
          const ref = doc(db, 'users', user.uid)
          
          const document = await getDoc(ref)
          
          setConditional(document.data())
        }
        getDocument()
      }
      
    }, [user?.uid])
    
    const [conditional, setConditional] = useState([])
    const [ firstName, setFirstName] = useState(conditional.firstName)
    const [ lastName, setLastName] = useState(conditional.lastName)


    function changeFirstName(event){
      setFirstName(event.target.value)
    }

    function changeLastName(event){
      setLastName(event.target.value)
    }

    // function changePassword(event) {
    //     setPassword(event.target.value)
    //     setConfirmPassword(event.target.value)
    // }

    function changeEmail(event){
        setEmail(event.target.value)
    }

    function handleSubmit(event) {
        event.preventDefault();
        
        setEmailError('');
        setPasswordError('');
        setUsernameError('');
        setLastNameError('');
        setFirstNameError('');
    
        const emailValid = validateEmail(email)
    
        // const passwordValid = validatePassword(confirmPassword);
        

        // const firstnameValid = validateFirstName(firstName)

        // const lastnameValid = validateLastName(lastName)
    
        if (!emailValid ) {
            return ;
        }
  
    const body = {
      firstName : firstName,
      lastName : lastName,
      password : password,
      email : email,
    };

    
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

  function containsNumber(str){
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

  if(containsNumber(username)){
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

console.log(email)
    return (
        <>
        <Header />
            <h1 className="profilePageh1">{conditional.firstName}'s Profile Page</h1>
            <ToastContainer />
          <AnimatePresence>
        {succes && (
            <motion.div
            initial={{opacity: 0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{ease:"easeOut", duration: 0.5}}
            className="succesMessage"
            >
              {succes}
            </motion.div>
        )}
          </AnimatePresence>
          
          <AnimatePresence>
        {deleteMessage && (
            <motion.div
            initial={{opacity: 0}}
            animate={{opacity:1}}
            exit={{opacity:0}}
            transition={{ease:"easeOut", duration: 0.5}}
            className="deleteMessage"
            >
              {deleteMessage}
            </motion.div>
        )}
          </AnimatePresence>
            
            <section className="profilePageSection">
            
            <div className="profilePageSection_divL">
              
              <h2>Informations regarding profile changes!</h2>
              
              <p>If you wish to edit your profile credentials, change the fields to what your new credentials want to be, after that, click the "EDIT" button, then, you need to confirm your new credentials, and that is it! You are good to go!</p>
              
              <p>After confirmation, you will be redirected to the login page in order to log in with your NEW credentials!</p>

            </div>
            <div className="profilePageSection_div">
                <form className="profilePageForm" onSubmit={handleSubmit}>
                    
                        <label htmlFor="firstName">First name</label>
                        <input type="text" id="firstName" defaultValue={conditional.firstName} onChange={changeFirstName}></input>
                        
                        <label htmlFor="lastName">Last name</label>
                        <input type="text" id="lastName" defaultValue={conditional.lastName} onChange={changeLastName}></input>

                        <label htmlFor="phoneNumber">Phone number</label>
                        <input type="number" id="phoneNumber" defaultValue={conditional.phoneNumber}></input>

                        <label htmlFor="street">Street</label>
                        <input type="text" id="street" defaultValue={conditional.street}></input>
                        
                        <label htmlFor="streetNo">Street No.</label>
                        <input type="text" id="streetNo" defaultValue={conditional.streetNo}></input>
                        
                        <label htmlFor="blockNo">Block No.</label>
                        <input type="text" id="blockNo" defaultValue={conditional.block}></input>
                        
                        <label htmlFor="apartNo">Apartament No.</label>
                        <input type="text" id="apartNo" defaultValue={conditional.block}></input>
                </form>
                
                <button type="button" onClick={toggleModalSubmitButton}> Edit </button>
                <button onClick={triggetResetEmail}>Reset password</button>
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
                        <p>Your new Firstname: {firstName}</p>
                        <p className="profileError">{firstNameError}</p>
                        <p>Your new Lastname: {lastName}</p>
                        <p className="profileError">{lastNameError}</p>
                        <p>Your new email: {email}</p>
                        <p className="profileError">{emailError}</p>
                        
                        

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
                    <div className="modal-content modal4">
                    <div className="modal4_content_header">
                        <h1>Do you REALLY want to delete your account?</h1>
                        <h3>We will miss you if you do that!</h3>
                    </div>

                  
                  <div className="modal3ButtonsWrapper">
                    <div className="modal3Buttons"> 
                        <button onClick={deleteAccount}>Delete</button>
                        <button onClick={toggleModalDeleteButton}>Cancel</button>
                    </div>
                  </div>
                    </div>
                </motion.div>
                )}
            </section>
        <PreFooter />
        <Footer />
        </>
    )
}