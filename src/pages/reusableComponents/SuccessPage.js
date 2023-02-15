import React, { useContext, useState } from 'react'
import { useEffect } from 'react'
import '../cartPage/ShoppingCartPage'
import emailjs from "emailjs-com"
import { BsFillPatchCheckFill } from 'react-icons/bs'
import {FiCheckCircle} from 'react-icons/fi'
import './SuccessPageCss.css'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, writeBatch } from 'firebase/firestore'
import { db } from '../../firebase-config'
import { FirebaseAuthContext } from '../../FirebaseAuthContext'

const hi = (email, firstName, lastName, phoneNumber, street, streetNo, block, apartamentNo) => {
  emailjs.send('service_eyuz8pg', 'template_xeem2dd', {
    subject: `Comanda de la ${email} (${firstName} ${lastName})`,
    metoda: `${firstName} ${lastName} a facut o plata in valoare de 3 RON`,

    name : `Nume : ${firstName} ${lastName} ( ${email} )`,
    phone: `Telefon : <b>${phoneNumber}</b>`,
    street : `Strada :<b>${street}</b>`,
    streetNo: `Nr. Strazii: <b>${streetNo}</b>`,
    bloc : `Bloc : <b>${block}</b>`,
    apartNo : `Apartament : <b>${apartamentNo}</b>`,
  }, 'crU6K8bQnftB81z-j')
};

const SuccessPage = () => {

  const {user} = useContext(FirebaseAuthContext)

  const email = localStorage.getItem("email");
  const firstName = localStorage.getItem("firstName");
  const lastName = localStorage.getItem("lastName");
  const phoneNumber = localStorage.getItem("phoneNumber");
  const street = localStorage.getItem("street");
  const streetNo = localStorage.getItem("streetNo");
  const block = localStorage.getItem("block");
  const apartamentNo = localStorage.getItem("apartamentNo");
  const isCompanyChecked = localStorage.getItem("isCompanyChecked");
  const companyName = localStorage.getItem("companyName");
  const companyCui = localStorage.getItem("companyCui");
  
  const details = {email, firstName, lastName, phoneNumber, street, streetNo, block, apartamentNo, isCompanyChecked, companyName, companyCui} 

  
  const [countdown, setCountdown] = useState(5)
  const navigate = useNavigate()
  
  useEffect(() => {

    if(firstName === null){
      console.log("You should not be here! Redirecting to home page.")
    } else {
      hi(email, firstName, lastName, phoneNumber, street, streetNo, block, apartamentNo);
    }

    localStorage.clear();

    let intervalId;
    let timeoutId;

    const startCountdown = () => {
      
      intervalId = setInterval(() => {
        setCountdown(countdown => countdown - 1);
      }, 1000);

      timeoutId = setTimeout(() => {
        navigate('/')
      }, 5000);
    
    };

    startCountdown();

    const deleteCartUponSuccess = async () => {
      
      if(user?.uid){
        
        const userDoc = collection(db, `users/${user.uid}/cart`)
        
        const q =await getDocs(userDoc)
        
        const batch = writeBatch(db)
        q.forEach(doc => {
        batch.delete(doc.ref)
      })
      
      batch.commit()
    }

    if(!user?.uid){
      const clientId = sessionStorage.getItem("clientId")

      const userDoc = collection(db, `guestCarts/${clientId}/cart`)
      
      const q =await getDocs(userDoc)
      
      const batch = writeBatch(db)
      q.forEach(doc => {
        batch.delete(doc.ref)
      })
      
      batch.commit()
    }

  }

  deleteCartUponSuccess();

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };

  }, [navigate, email, firstName,lastName,phoneNumber,street,streetNo,block,apartamentNo]);

    return (
    <div className='successFlex'>
      <div className='successBackground'>

      <div className='successIcon'>
        <FiCheckCircle  className='successIcon__icon'/>
      </div>

      <div>
        <h1>Success</h1>
      </div>
      
      <div className='successText'>
        <p>We received your purchase request.</p>
        <p>We'll be in touch shortly. :)</p>
      </div>

      {countdown}

      </div>
    </div>  
  )
}

export default SuccessPage
