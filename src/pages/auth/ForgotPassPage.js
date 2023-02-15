import React from 'react'
import './ForgotPassPage.css'
import { FaKey } from 'react-icons/fa'
import { useState } from 'react'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast, ToastContainer } from 'react-toastify'

function ForgotPassPage() {
    const [email , setEmail] = useState('')

    function emailChangeHandler(e){
        setEmail(e.target.value)
    }

    function resetPass() {
        const auth = getAuth()
        
        sendPasswordResetEmail(auth, email)
        .then(() => {
            toast.success('Email sent!')
        })
        .catch((error) => {
            console.log(error.message)
        });
    }

    return (
    <div className='passFlex'>
        <ToastContainer />
        <div className='passBackground'>
            <div className='passBackground__icon'>
                <FaKey />
            </div>

            <div>
                <p>Forgot password ?</p>
            </div>

            <div>
                <p>Enter your email!</p>
                <p>You will get a email with a link for resetting your password!</p>
            </div>

            <div className="inputBoxes">
                    <input id="email" type="text" value={email} onChange={emailChangeHandler} autoComplete="true" required></input>
                    <span>Email</span>
             </div>
            
            <button onClick={resetPass}>Send</button>
        </div>
    </div>
  )
}

export default ForgotPassPage
