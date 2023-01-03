import React, { useEffect, useState } from "react";
import { AdminPanelComponent } from "./AdminPanelComponent";

export function AdminPanelFetch(){
    const [users , setUsers] = useState([])
    
    useEffect(() => {
        fetch("http://localhost:3001/users")
        .then(response => response.json())
        .then(response => setUsers(response))
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
                    password = {item.confirmPassword}
                    email = {item.email}
                    firstName = {item.firstName}
                    lastName = {item.lastName}
                    username = {item.username}
                    key = {item.id}
                    ></AdminPanelComponent>
                    )
                })}
        </section>
        </>
    )
}