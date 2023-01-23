import React from 'react'

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
            <input type="text" required value={formData.apartNo} onChange={saveApartamentNo}/>
            <span>Apartament No.</span>
        </div>
    
        <div className='inputBoxes'>
            <input type="text" required value={formData.block} onChange={saveBlock}/>
            <span>Block</span>
        </div>
    </div>
  )
}

export default Adress
