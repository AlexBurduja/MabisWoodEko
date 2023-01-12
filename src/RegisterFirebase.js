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
          displayName : name,
          age : 10,
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

  return (
    <>
      <h1>Register</h1>
      <input placeholder='email' onChange={saveEmail}></input>
      <input placeholder='password' onChange={savePassword}></input>
      <input placeholder='name' onChange={saveName}></input>

      <button onClick={register}>Create</button>
    </>
  );
}
