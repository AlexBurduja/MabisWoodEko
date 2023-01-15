import React from 'react'

function OtherInfo({formData, setFormData}) {
  function saveAddress(event){
    setFormData({...formData, address : event.target.value})
  }

  function savePhone(event){
    setFormData({...formData, phoneNumber : event.target.value})
  }
  
    return (
    <div className='wrapperCenter'>
        
        <div className='inputBoxes'>
            <input type="text" required value={formData.address} onChange={saveAddress}/>
            <span>Address</span>
        </div>
            
        <div className='inputBoxes'>
            <input type="text" required value={formData.phoneNumber} onChange={savePhone}/>
            <span>Phone Number</span>
        </div>    

            
    
    </div>
  )
}

export default OtherInfo
