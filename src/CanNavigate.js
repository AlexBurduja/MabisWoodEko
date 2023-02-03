import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { db } from "./firebase-config";
import { FirebaseAuthContext } from "./FirebaseAuthContext";
import Loading from "./pages/reusableComponents/Loading";


export function CanNavigate({ children }){
    const { user } = useContext(FirebaseAuthContext)
    const [ conditional, setConditional ] = useState([])

    const [loading, setLoading] = useState(true)

    useEffect(() => {

        if (user){
          const getDocument = async () => {
            const ref = doc(db, `users/${user.uid}`)
            
            const document = await getDoc(ref)
            
            setConditional(document.data())
            setLoading(false)
          }
          getDocument()
        }
      }, [user])
      
      console.log(conditional)

      
      
      if(Object.keys(conditional).length === 0){
        return null;
      }

        if(conditional.admin === true){
          return (children)
        } else {
          return <Navigate to="/" replace={true} />
        }

}