import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase-config';
import React, {  useContext, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FirebaseAuthContext } from './FirebaseAuthContext';



export function RegisterFirebase() {
  const [registerEmail , setRegisterEmail] = useState('')
  const [registerPassword , setRegisterPassword] = useState('')
  const [name , setName] = useState('')

  // const [user , setUser] = useState({})

  const { user } = useContext(FirebaseAuthContext)
  
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     setUser(user)
  //   }
  // })

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

///

  // const getDocument = async () => {

  //   const ref = doc(db, 'users', user.uid)
  //   let document = await getDoc(ref)

  //   return document.data().admin
  // }

  // const [conditional , setConditional] = useState(false)
  
  //   getDocument()
  //     .then(data => {
  //       setConditional(data) })

///

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

  return (
    <>
      <h1>Register</h1>
      <div className="inputBoxes">
        <input id="firstName" type="text" onChange={saveFirstName} required></input>
        <span htmlFor='firstName'>First name</span>
      </div>
      <input placeholder='firstName' onChange={saveLastName}></input>
      <input placeholder='email' onChange={saveEmail}></input>
      <input placeholder='password' onChange={savePassword}></input>
      <input placeholder='name' onChange={saveName}></input>
      <input placeholder='address' onChange={saveAddress}></input>
      <input placeholder='phone' onChange={savePhone}></input>

      <button onClick={register}>Create</button>
    </>
  );
}
