import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import '../cartPage/ShoppingCartPage'
import emailjs from "emailjs-com"

const SuccessPage = () => {

  // const { search } = useLocation();
  // const params = new URLSearchParams(search);
  // const email = params.get("email");
  // const firstName = params.get("firstName");
  // const lastName = params.get("lastName");
  // const phoneNumber = params.get("phoneNumber");
  // const street = params.get("street");
  // const streetNo = params.get("streetNo");
  // const block = params.get("block");
  // const apartamentNo = params.get("apartamentNo");
  // const isCompanyChecked = params.get("isCompanyChecked");
  // const companyName = params.get("companyName");
  // const companyCui = params.get("companyCui");

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
  
  console.log(email, firstName, lastName, phoneNumber, street, streetNo, block, apartamentNo, isCompanyChecked, companyName, companyCui)
  
  useEffect(() => {
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
  }, [])

    return (
    <div>
      <h1 style={{textAlign:"center"}}>Success</h1>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <h1>Thanks {email} for ordering!</h1>
    </div>  
  )
}

export default SuccessPage
