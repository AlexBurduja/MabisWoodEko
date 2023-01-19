import React from 'react'
import { AiOutlineEye } from 'react-icons/ai'

function SignUpInfo({ formData, setFormData }) {
    function saveEmail(event){
        setFormData({...formData, email: event.target.value})
    }
  
    function savePassword(event){
        setFormData({...formData, password: event.target.value})
    }
  
    function saveConfirmPassword(event){
        setFormData({...formData, confirmPassword: event.target.value})
    }
  

    return (
    <div className='wrapperCenter'>
                <div className="inputBoxes">
                    <input id="email" type="text" autoComplete required value={formData.email} 
                    onChange={saveEmail}/>
                    <span>Email</span>
                    {/* <p className="error">{emailError}</p> */}
                </div>

                <div className="inputBoxes">
                    <input id="password" type="password" required value={formData.password} onChange={savePassword}/>
                    <span>Password</span>
                    {/* <p className="error">{passwordError}</p> */}
                    <p className="eyeIcon"><AiOutlineEye/></p>
                </div>

                <div className="inputBoxes">
                    <input id="confirmPassword" type="password" required value={formData.confirmPassword} onChange={saveConfirmPassword} />
                    <span>Confirm Password</span>
                    {/* <p className="error">{passwordError}</p> */}
                    <p className="eyeIcon"><AiOutlineEye/></p>
                </div>


    </div>
  )
}

export default SignUpInfo