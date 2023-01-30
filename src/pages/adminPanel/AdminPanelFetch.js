import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { AdminPanelComponent } from "./AdminPanelComponent";

export function AdminPanelFetch(){
    const [users , setUsers] = useState([])
    

    useEffect(() => {
        const getUsers = async () => {
            const userDoc = collection(db, `users`)

            const data = await getDocs(userDoc)

            setUsers(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
        }
        getUsers()

    }, []) 
        
console.log(users)
    return (
        <>
        <div className="userPageHeader">
            <h1>Users</h1>
            <h3>Here you can see everyone that created a profile on the site and all informations about their account.</h3>
        </div>
        
        <section className="adminPanel">
            {users.map((item) => {
                return (
                    <AdminPanelComponent
                    id = {item.id}
                    admin = {item.admin}
                    password = {item.password}
                    confirmPassword = {item.confirmPassword}
                    email = {item.email}
                    firstName = {item.firstName}
                    lastName = {item.lastName}
                    username = {item.username}
                    created = {item.createdAt}
                    key = {item.id}
                    ></AdminPanelComponent>
                    )
                })}
        </section>
        </>
    )
}