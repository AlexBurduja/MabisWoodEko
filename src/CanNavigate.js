import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { db } from "./firebase-config";
import { FirebaseAuthContext } from "./FirebaseAuthContext";


export function CanNavigate({ children }){
    const { user } = useContext(FirebaseAuthContext)
    const [ conditional, setConditional ] = useState({})

    useEffect(() => {

        if (user?.uid){
        
          const getDocument = async () => {
            const ref = doc(db, 'users', user.uid)
            
            let document = await getDoc(ref)
            
            return document.data()
            
          }
          getDocument()
          .then(data => setConditional(data))
        
        }
      }, [user?.uid])

      if(conditional.admin === true){
        return (children);
      } else {
        return <Navigate to="/" replace={true} />
      }
}