import React from 'react'
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import '../cartPage/ShoppingCartPage'

const SuccessPage = () => {

  const location = useLocation();
  const state = location.state;

  if (!state) return <div>Loading...</div>;

  const { email, firstName, lastName, phoneNumber, street, streetNo, block, apartamentNo, isCompanyChecked, companyName, companyCui } = state;

  console.log( firstName, lastName, phoneNumber);

    return (
    <div>
      <h1 style={{textAlign:"center"}}>Success</h1>
    </div>  
  )
}

export default SuccessPage
