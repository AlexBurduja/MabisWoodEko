import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import   { auth } from "./firebase-config"

export const FirebaseAuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState({});

    useEffect(() => {
        // onAuthStateChanged(auth, (user) => {
        //     if(user){
        //         setUser(user)
        //     }
        // })

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            console.log(currentUser.uid)
            setUser(currentUser)
        });

        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <FirebaseAuthContext.Provider value={{ user }}>{children}</FirebaseAuthContext.Provider>
    )
}