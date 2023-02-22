import React from 'react'
import './PrivacyPolicyCss.css'

export function PrivacyPolicy() {


  return (
    <div className='divPrivacy'>
      <iframe className='iframePrivacy' src={'https://firebasestorage.googleapis.com/v0/b/pelets-af6eb.appspot.com/o/legal%2FPrivacy%20Policy.pdf?alt=media&token=6508ddde-a56d-411d-8bbb-f6be671c7580'} title='privacyPdf' />
    </div>
  )
}