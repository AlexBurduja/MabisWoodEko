import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth, createUserDocument, db, firestore } from './firebase-config';
import React, { useEffect, useState } from 'react';
import { addDoc, collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import { async } from '@firebase/util';



export function RegisterFirebase() {
  const [registerEmail , setRegisterEmail] = useState('')
  const [registerPassword , setRegisterPassword] = useState('')
  const [name , setName] = useState('')
  
  const [user, setUser] = useState({})

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser)
  })

  function saveEmail (event) {
    setRegisterEmail(event.target.value)
  }

  function savePassword (event) {
    setRegisterPassword(event.target.value)
  }

  function saveName(event){
    setName(event.target.value)
  }

  // const getAdmin = async () => {
  //   const data = await getDocs(ref)
  //   console.log(data)
  // }


  // getAdmin()
  // console.log(auth.currentUser.uid.displayName)

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

      console.log(user)
      // await createUserDocument(user, name)
    } catch (error) {
      console.log(error.message)
    }
  }


  const getDocument = async () => {

    const ref = doc(db, 'users', user.uid)
    let document = await getDoc(ref)
    
    console.log(document.data().admin)
    return document.data().admin
  }

  getDocument()



  // console.log(auth.currentUser.uid)

  return (
    <>
      {getDocument() === true && (
        <p>Admin</p>
      )} 
      <h1>Register</h1>
      <input placeholder='email' onChange={saveEmail}></input>
      <input placeholder='password' onChange={savePassword}></input>
      <input placeholder='name' onChange={saveName}></input>

      <button onClick={register}>Create</button>
      
    </>
  );
}
