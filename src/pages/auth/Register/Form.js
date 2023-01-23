import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../firebase-config';
import React, {  useContext, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FirebaseAuthContext } from '../../../FirebaseAuthContext';
import SignUpInfo from './SignUpInfo';
import PersonalInfo from './PersonalInfo';
import Adress from './Adress';
import "./RegisterMulti.css"
import ParticlesBackground from '../../../particlesJS/particleJsComponent';



export function Form() {

const [page, setPage] = useState(0)
const [formData , setFormData] = useState({
  email : '',
  password : '',
  confirmPassword: '',
  firstName : '',
  lastName : '',
  street : '',
  streetNo: '',
  apartNo: '',
  block : '',
  phoneNumber : ''
})

const FormTitles = ["Sign Up", "Personal Info", "Adress"]

const PageDisplay = () => {
  if (page === 0){
    return <SignUpInfo formData={formData} setFormData={setFormData}/>
  } else if (page === 1) {
    return <PersonalInfo formData={formData} setFormData={setFormData}/>
  } else {
    return <Adress formData={formData} setFormData={setFormData}/>
  }
}

console.log(formData.email)

const registerO = async (event) => {
  try{
    const user = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    await setDoc(doc(db,"users", user._tokenResponse.localId), {
      firstName : formData.firstName,
      lastName : formData.lastName,
      phoneNumber : formData.phoneNumber,
      street : formData.street,
      streetNo : formData.streetNo,
      apartNo : formData.apartNo,
      block : formData.block,
      admin: false
    })

  } catch (e){
    console.log(e.message)
  }
}




  return (
    <>
      {/* <h1>Register</h1> */}
      <div className='form'>
      <ParticlesBackground />
        <div className='progressbar'>
          <div className='progressbarTransaction' style={{ width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%", transition: "width ease-in 1s"}}></div>
        </div>
        <div className='form-container'>
          <div className='header'>
            <h1>{FormTitles[page]}</h1>
          </div>
          <div className='body'>
            {PageDisplay()}
          </div>
          <div className='footer'>
            <button
            disabled={page === 0} 
            onClick={() => {setPage((currPage) => currPage - 1)}}>Previous</button>
            <button 
            // disabled={page === FormTitles.length - 1}
            onClick={() => {
              if(page === FormTitles.length - 1) {
                registerO()
              } else {
              
                setPage((currPage) => currPage + 1)
              
              }}}>
              {page === FormTitles.length - 1 ? "Submit" : "Next"}
              </button>
          </div>

        </div>
      </div>
    </>
  );
}
