import React from 'react'
import { FcCancel } from 'react-icons/fc'
import { NavLink } from 'react-router-dom'
import './CancelPageCss.css'

function CancelPage() {
  return (
    <div className='cancelFlex'>
        
        <div className='cancelBackground'>

            <div className='cancelIcon'>
                <FcCancel  className='cancelIcon__icon'/>  
            </div>

            <div className='cancelTitle'>
                <h1>Failed / Canceled</h1>
            </div>

            <div className='cancelButtonsAndText'>
                <div>
                    <p>Payment failed/canceled.</p>
                    <p>What do you wish to do next?</p>
                </div>
                
                <div className='cancelButtonsAndText__buttons'>
                    <NavLink to={'/cart'}>To Cart!</NavLink>
                    <NavLink to={'/'}>To Home!</NavLink>
                </div>
            </div>
        
        </div>
    
    </div>
  )
}

export default CancelPage
