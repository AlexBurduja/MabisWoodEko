import React from 'react'
import "./Loading.css"
import logo  from "../../publicResources/logoMabisCerc.svg"

function Loading() {
  return (
    <div className='loading-screen'>
        <div className='logo-container'>
            <img src={logo} alt="logo"/>
        </div>

        <div>
            <h1>Loading...Please wait :)</h1>
        </div>
    </div>
  )
}

export default Loading
