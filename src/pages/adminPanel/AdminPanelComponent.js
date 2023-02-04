import React, { useContext, useEffect, useState } from "react";
import "./AdminPanelComponent.css"
import { GrContactInfo } from "react-icons/gr"
import { AiOutlineCloseCircle, AiOutlineEye } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { deleteUser } from "firebase/auth";
import { deleteDoc, doc, updateDoc } from "@firebase/firestore";
import { db } from "../../firebase-config";
import { FirebaseAuthContext } from "../../FirebaseAuthContext";
import Loading from "../reusableComponents/Loading";

export function AdminPanelComponent(props) {

    const { id , admin , phoneNumber, street, streetNo, apartNo, blockNo, created , email , firstName , lastName  } = props


    const {user , conditional} = useContext(FirebaseAuthContext)

    const [modal, setModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);

    const [succes, setSucces] = useState('')

    const toggleModal = () => {
      setModal(!modal)
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    };
    
    const toggleEditModal = () => {
      setEditModal(!editModal)
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    };

    const toggleDeleteModal = () => {
      setDeleteModal(!deleteModal)
    };
  
    if(modal) {
      document.body.classList.add('active-modal')
    } else {
      document.body.classList.remove('active-modal')
    };

    const [passwordShow, setPasswordShow] = useState(false)
    const togglePassword = () => {
      setPasswordShow(!passwordShow)
    }

    function changeFirstName(event){
      setFirstName(event.target.value)
    }

    function changeLastName(event){
      setLastName(event.target.value)
    }

    function changeEmail(event){
        setNewEmail(event.target.value)
    }

    // const [email, setEmail] = useState(conditional.email)

    // console.log(conditional.email)
    
    const [ newFirstName, setFirstName] = useState(firstName)
    const [ newLastName, setLastName] = useState(lastName)
    const [ newEmail, setNewEmail ] = useState(email)


    function oonSubmit(event){
        event.preventDefault();


    const body = {
        firstName : newFirstName,
        lastName : newLastName,
        email : newEmail,
      };
  

    }

    function makeAdmin( id ){
        const body = {
            admin : true
        }

        const ref = doc(db, `users/${id}`)
        
        try {
            updateDoc(ref, body)
        } catch(e) {
            console.log(e)
        }
    }

    function revokeAdmin(id){
        const body = {
            admin : false
        }

        const ref = doc(db, `users/${id}`)

        try {
            updateDoc(ref,body)
        } catch(e) {
            console.log(e)
        }
    }


    const adminDelete = async (user) => {
        const ref = doc(db, `users/${user}`)
        deleteDoc(ref)

    }



    return (
        <>
        
        <div className="userRow">
            <div className="userRowRow">
                <button onClick={toggleModal}> <GrContactInfo /> </button>
                <p> {firstName} {lastName}</p>
            </div>
        </div>
        <AnimatePresence>

        {modal && (
             <motion.div
             initial={{opacity:0}}
             animate={{opacity:1}}
             exit={{opacity:0}} 
             className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                    <div className="modal-content modal-content-main">
                        <AiOutlineCloseCircle onClick={toggleModal} className="modal-content-x"/>
                        <div className="userModalHeader">
                            <h1>{firstName}'s Account Info</h1>
                        </div>

                        <div className="userModalContent">
                            <div className="userModalContentAdmin">
                                <p className={admin ? 'red' : 'black'}>{admin ? 'Currently Admin' : 'Not Admin'}</p>

                                {!admin && (
                                    <div className="center makeAdmin">
                                    <button  onClick={() => makeAdmin(id)}>Assign as Admin</button>
                                    </div>
                                )}

                                {admin && (
                                    <div className="center revokeAdmin">
                                    <button onClick={() => revokeAdmin(id)}>Revoke Admin</button>
                                    </div>
                                )}
                            </div>

                            <p>Account created at : <span className="createdAt">{created}</span></p>

                            {succes && (
                                <motion.p
                                initial={{opacity:0}}
                                animate={{opacity:1}}
                                exit={{opacity:0}}
                                className='stateMessage'>
                                    {succes}
                                </motion.p>
                            )}
                        <form className="adminPanelForm" onSubmit={oonSubmit}>
                            <div className="userModalContentEmail">
                                <p>Email</p>
                                <input defaultValue={email} onChange={changeEmail}></input>
                            </div>
                            
                            <div className="userModalContentFirstLastName">
                                <p>Last Name</p>
                                <input defaultValue={lastName} onChange={changeLastName}></input>
                            </div>
                            
                            <div className="userModalContentFirstLastName">
                                <p>First Name</p>
                                <input defaultValue={firstName} onChange={changeFirstName}></input>
                            </div>
                            
                            <div className="userModalContentFirstLastName">
                                <p>Phone Number</p>
                                <input defaultValue={phoneNumber} onChange={changeFirstName}></input>
                            </div>
                            
                            <div className="userModalContentFirstLastName">
                                <p>Street</p>
                                <input defaultValue={street} onChange={changeFirstName}></input>
                            </div>
                            
                            <div className="userModalContentFirstLastName">
                                <p>Street No.</p>
                                <input defaultValue={streetNo} onChange={changeFirstName}></input>
                            </div>
                            
                            <div className="userModalContentFirstLastName">
                                <p>Block</p>
                                <input defaultValue={blockNo} onChange={changeFirstName}></input>
                            </div>
                            
                            <div className="userModalContentFirstLastName">
                                <p>Apartament No.</p>
                                <input defaultValue={apartNo} onChange={changeFirstName}></input>
                            </div>
                            
                        <div className="adminPanelButtons">
                            <button type="button" onClick={toggleEditModal}>Edit</button>
                            <button type="button" onClick={toggleDeleteModal}>Delete</button>
                        </div>
                        </form>
                        </div>
                    </div>
            </motion.div>
            
        )}
        </AnimatePresence>

       
        <AnimatePresence>
    {editModal && (
         <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}} 
            className="modal">
        <div onClick={toggleEditModal} className="overlay"></div>
            <div className="modal-content">
            <h1>Are you sure?</h1>
            <p>You are about to edit {firstName}'s account.</p>

        <div className="adminEditModalButtons">
            <button type="submit" onClick={oonSubmit}>Confirm</button>
            <button onClick={toggleEditModal}>Take me back</button>
        </div>
            </div>
            
        </motion.div>
        
        )}
    </AnimatePresence>

        <AnimatePresence>
    {deleteModal && (
         <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{opacity:0}} 
            className="modal">
        <div onClick={toggleDeleteModal} className="overlay"></div>
            <div className="modal-content">
            <h1>Are you sure?</h1>
            <p>You are about to permanently delete {firstName}'s profile.</p>

            {succes && (
                <motion.p
                initial={{opacity:0}}
                animate={{opacity:1}}
                exit={{opacity:0}}
                className='stateMessage'>
                    {succes}
                </motion.p>
            )}
            <div className="adminEditModalButtons">
                <div>
            <button type="submit" onClick={adminDelete}>Delete</button>
                </div>

                <div>
            <button onClick={toggleDeleteModal}>Take me back</button>
                </div>
            </div>
        </div>
            
        </motion.div>
        
        )}
    </AnimatePresence>

        </>

)

}