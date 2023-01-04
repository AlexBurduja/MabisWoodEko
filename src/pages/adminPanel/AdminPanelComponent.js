import React, { useState } from "react";
import "./AdminPanelComponent.css"
import { GrContactInfo } from "react-icons/gr"
import { AiOutlineEye } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

export function AdminPanelComponent(props) {

    const { id , admin , confirmPassword , created , password,  email , firstName , lastName , username } = props

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

    function changeUsername(event) {
        setUsername(event.target.value)
    }

    function changeFirstName(event){
      setFirstName(event.target.value)
    }

    function changeLastName(event){
      setLastName(event.target.value)
    }

    function changePassword(event) {
        setPassword(event.target.value)
        setConfirmPassword(event.target.value)
    }

    function changeEmail(event){
        setEmail(event.target.value)
    }
    
    const [ newUsername, setUsername ] = useState(username)
    const [ newPassword, setPassword ] = useState(password)
    const [ newFirstName, setFirstName] = useState(firstName)
    const [ newLastName, setLastName] = useState(lastName)
    const [ newEmail, setEmail ] = useState(email)
    const [ newConfirmPassword, setConfirmPassword] = useState(confirmPassword)

    function oonSubmit(event){
        event.preventDefault();

    const body = {
        firstName : newFirstName,
        lastName : newLastName,
        username : newUsername,
        password : newPassword,
        email : newEmail,
        confirmPassword : newConfirmPassword
      };
  
      fetch(`http://localhost:3001/users/${id}` ,{
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      } )
      .then(response => {
        if(response.status === 200){
            setSucces(`You edited ${username}'s credentials`)

            setInterval(() => {
                setSucces('')
                window.location.reload()

            }, 1500)
        }
      })

    }

    function makeAdmin(){
        const body = {
            admin : true
        }

        fetch(`http://localhost:3001/users/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
        })
        .then(response => {
            if(response.status === 200) {
                setSucces(`${username} is Admin`)
                setEditModal(false)

                setInterval(() => {
                    setSucces('')
                    window.location.reload()

                }, 1500)
            }
        })
    }

    function revokeAdmin(){
        const body = {
            admin : false
        }

        fetch(`http://localhost:3001/users/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(body)
        })
        .then(response => {
            if(response.status === 200) {
                setSucces(`${username} is no longer Admin`)
                setEditModal(false)
    
                setInterval(() => {
                    setSucces('')
                    window.location.reload()
    
                }, 1500)
            }
        })
    }

    function adminDelete(){
        fetch(`http://localhost:3001/users/${id}`, {
            method: "DELETE"
        })
        .then(response => {
            if(response.status === 200) {
                setSucces(`${username} was deleted`)
                setEditModal(false)
    
                setInterval(() => {
                    setSucces('')
                    window.location.reload()
    
                }, 1500)
            }
        })
    }

    return (
        <>
        <div className="userRow">
            <div className="userRowRow">
                <button onClick={toggleModal}> <GrContactInfo /> </button>
                <p> {firstName} "{username}" {lastName}</p>
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
                    <div className="modal-content ">
                        <button onClick={toggleModal} className="modal-content-x">X</button>
                        <div className="userModalHeader">
                            <h1>{username}'s Account Info</h1>
                        </div>

                        <div className="userModalContent">
                            <div className="userModalContentAdmin">
                                <p className={admin ? 'red' : 'black'}>{admin ? 'Currently Admin' : 'Not Admin'}</p>

                                {!admin && (
                                    <div className="center makeAdmin">
                                    <button  onClick={makeAdmin}>Assign as Admin</button>
                                    </div>
                                )}

                                {admin && (
                                    <div className="center revokeAdmin">
                                    <button onClick={revokeAdmin}>Revoke Admin</button>
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
                            
                            <div className="userModalContentUsername">
                                <p>Username</p>
                                <input defaultValue={username} onChange={changeUsername}></input>
                            </div>

                            <div className="userPasswordDiv">
                                <div className="userPasswordInput">
                                    <p>Password</p>
                                    <input id='userPassword' type={passwordShow ? "text" : "password"} defaultValue={confirmPassword} onChange={changePassword} ></input>
                                    <div>
                                        <p className="userPasswordEyeIcon" onClick={togglePassword}><AiOutlineEye/></p>
                                    </div>
                                </div>
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
            <div className="modal-content ">
            <h1>Are you sure?</h1>
            <p>You are about to edit {username}'s account.</p>

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
            <div className="modal-content ">
            <h1>Are you sure?</h1>
            <p>You are about to permanently delete {username}'s profile.</p>

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