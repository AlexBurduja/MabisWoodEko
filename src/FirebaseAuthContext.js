import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import   { auth } from "./firebase-config"

export const FirebaseAuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [user,setUser] = useState({});

    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            console.log("User is not logged in.")
        });

        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <FirebaseAuthContext.Provider value={{ user }}>{children}</FirebaseAuthContext.Provider>
    )
}