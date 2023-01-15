import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../firebase-config';
import React, {  useContext, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FirebaseAuthContext } from '../../../FirebaseAuthContext';
import SignUpInfo from './SignUpInfo';
import PersonalInfo from './PersonalInfo';
import OtherInfo from './OtherInfo';
import "./RegisterMulti.css"



export function Form() {
  const [registerEmail , setRegisterEmail] = useState('')
  const [registerPassword , setRegisterPassword] = useState('')
  const [name , setName] = useState('')

  // const [user , setUser] = useState({})

  const { user } = useContext(FirebaseAuthContext)
  

  function saveEmail (event) {
    setRegisterEmail(event.target.value)
  }

  function savePassword (event) {
    setRegisterPassword(event.target.value)
  }

  function saveName(event){
    setName(event.target.value)
  }


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
          phoneNumber : phone,
          address : address,
          admin: false 
        })
    } catch (error) {
      console.log(error.message)
    }
  }


const [firstName, setFirstName] = useState("")
const [lastName, setLastName] = useState("")
const [phone, setPhone] = useState("")
const [address, setAddress] = useState("")

function saveFirstName(event){
  setFirstName(event.target.value)
}

function saveLastName(event){
  setLastName(event.target.value)
}

function savePhone(event){
  setPhone(event.target.value)
}

function saveAddress(event){
  setAddress(event.target.value)
}

const [page, setPage] = useState(0)
const [formData , setFormData] = useState({
  email : '',
  password : '',
  confirmPassword: '',
  firstName : '',
  lastName : '',
  address : '',
  phoneNumber : ''
})

const FormTitles = ["Sign Up", "Personal Info", "Other"]

const PageDisplay = () => {
  if (page === 0){
    return <SignUpInfo formData={formData} setFormData={setFormData}/>
  } else if (page === 1) {
    return <PersonalInfo formData={formData} setFormData={setFormData}/>
  } else {
    return <OtherInfo formData={formData} setFormData={setFormData}/>
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
      address : formData.address,
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

      {/* <div className="inputBoxes">
        <input id="firstName" type="text" onChange={saveFirstName} required></input>
        <span htmlFor='firstName'>First name</span>
      </div>
      <input placeholder='firstName' onChange={saveLastName}></input>
      <input placeholder='email' onChange={saveEmail}></input>
      <input placeholder='password' onChange={savePassword}></input>
      <input placeholder='name' onChange={saveName}></input>
      <input placeholder='address' onChange={saveAddress}></input>
      <input placeholder='phone' onChange={savePhone}></input>

      <button onClick={register}>Create</button> */}
    </>
  );
}
