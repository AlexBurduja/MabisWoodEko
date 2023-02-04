import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { FirebaseAuthContext } from "../../FirebaseAuthContext";
import Loading from "../reusableComponents/Loading";
import { AdminPanelComponent } from "./AdminPanelComponent";

export function AdminPanelFetch(){
    const [users , setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getUsers = async () => {
            const userDoc = collection(db, `users`)

            const data = await getDocs(userDoc)

            setUsers(data.docs.map((doc) => ({...doc.data(), id:doc.id})))
            setLoading(false)
        }
        getUsers()

    }, []) 
    
    return (
        <>
        {loading ? <Loading /> : 
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
                    email = {item.email}
                    firstName = {item.firstName}
                    lastName = {item.lastName}
                    created = {item.createdAt}
                    street = {item.street}
                    streetNo = {item.streetNo}
                    apartNo = {item.apartNo}
                    blockNo = {item.block}
                    phoneNumber = {item.phoneNumber}
                    key = {item.id}
                    ></AdminPanelComponent>
                    )
                })}
        </section>
        </>
        }
        </>
    )
}