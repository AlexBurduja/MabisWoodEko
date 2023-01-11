import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import app, { auth } from "./firebase-config"

export const AuthContext = React.createContext();

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
        <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
    )
}