import React from 'react'
import { NavLink } from 'react-router-dom'

function Adress({formData, setFormData}) {

  function saveStreet(event){
    setFormData({...formData, street : event.target.value})
  }

  function saveStreetNo(event){
    setFormData({...formData, streetNo: event.target.value})
  }

  function saveApartamentNo(event){
    setFormData({...formData, apartNo: event.target.value})
  }

  function saveBlock(event){
    setFormData({...formData, block: event.target.value})
  }

  function saveCheck(event){
    const { checked } = event.target
    setFormData({...formData, check: checked})
  }

  
    return (
    <div className='wrapperCenter'>
        
        <div className='inputBoxes'>
            <input type="text" required value={formData.street} onChange={saveStreet}/>
            <span>Street</span>
        </div>
           
        <div className='inputBoxes'>
            <input type="text" required value={formData.streetNo} onChange={saveStreetNo}/>
            <span>Street No.</span>
        </div>

        <div className='inputBoxes'>
            <input type="text" required value={formData.block} onChange={saveBlock}/>
            <span>Block No.</span>
        </div>

        <div className='inputBoxes'>
            <input type="text" required value={formData.apartNo} onChange={saveApartamentNo}/>
            <span>Apartament No.</span>
        </div>

<div>
        <input type='checkbox' id='check' onClick={saveCheck}></input>
        <label htmlFor='check'>I have read and I agree to the <NavLink to=''>terms and conditions</NavLink>, <NavLink to=''>privacy policy</NavLink>, <NavLink to=''>return policy</NavLink>.</label>
</div>

    
    </div>
  )
}

export default Adress
