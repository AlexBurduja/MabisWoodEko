import React from 'react'

function PersonalInfo({formData, setFormData}) {
  function saveFirstName(event){
    setFormData({...formData, firstName:event.target.value})
  }
  
  function saveLastName(event){
    setFormData({...formData, lastName:event.target.value})
  }
  
    return (
    <div className='wrapperCenter'>
        <div className='inputBoxes'>
            <input type="text" required value={formData.firstName} onChange={saveFirstName}/>
            <span>First Name</span>
        </div>

        <div className='inputBoxes'>
            <input type="text" required value={formData.lastName} onChange={saveLastName}/>
            <span>Last Name</span>
        </div>

    </div>
  )
}

export default PersonalInfo
