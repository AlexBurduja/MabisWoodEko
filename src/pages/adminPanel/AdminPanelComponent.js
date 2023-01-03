import React, { useState } from "react";
import "./AdminPanelComponent.css"
import { GrContactInfo } from "react-icons/gr"
import { AiOutlineEye } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";

export function AdminPanelComponent(props) {

    const { id , admin , password , email , firstName , lastName , username } = props

    const [modal, setModal] = useState(false);

    const toggleModal = () => {
      setModal(!modal)
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
                        <div className="userModalHeader">
                            <h1>{username}'s Account Info</h1>
                        </div>    

                        <div className="userModalContent">
                            <div>
                                <p>Email : {email}</p>
                            </div>

                            <div>
                                <p>First and Last name : {firstName} {lastName}</p>
                            </div>

                            <div>
                                <p>Username : {username}</p>
                            </div>

                            <div className="userPasswordDiv">
                                <div className="userPasswordInput">
                                    <input id='userPassword' type={passwordShow ? "text" : "password"} defaultValue={password} ></input>
                                </div>
                                <div>
                                    <p className="userPasswordEyeIcon"
                                    onClick={togglePassword}><AiOutlineEye/></p>
                                </div>
                            </div>

                        </div>
                    </div>
            </motion.div>
            
        )}
        </AnimatePresence>
        </>
    )
}