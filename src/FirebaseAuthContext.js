import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import app, { auth } from "./firebase-config"

export const FirebaseAuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if(user){
                setUser(user)
            }
        })
    }, [])

    return (
        <FirebaseAuthContext.Provider value={{ user }}>{children}</FirebaseAuthContext.Provider>
    )
}