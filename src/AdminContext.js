import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Navigate, Redirect, Route } from "react-router-dom";
import { db } from "./firebase-config";
import { FirebaseAuthContext } from "./FirebaseAuthContext";


export function AdminContext(props) {

    const { user } = useContext(FirebaseAuthContext)

    const [ conditional , setConditional] = useState({})

    useEffect(() => {
        if(user?.uid){
  
        const ref = doc(db, 'users', user.uid)
          
      const getDocument = async () => {
        
        let document = await getDoc(ref)
        
        return document.data()
      }
      
      getDocument()
      .then(data => {
        setConditional(data)
      })
    }

}, [])

if(conditional.admin === true){
  return (
      <Navigate exact to="/registerfirebase"></Navigate>
  )
} else {
  return (
      <Route exact path={props.path}>
          {props.children}
      </Route>
  )
}

}