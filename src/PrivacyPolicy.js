import React from 'react'
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf'

const pdf= './publicResources/Privacy Policy Mabis Wood Eko (2).pdf';
export function PrivacyPolicy() {
  
  pdfjs.GlobalWorkerOptions.workerSrc = 
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  return (
    <div className='divPrivacy'>
      <iframe className='iframePrivacy' title='privacyFrame' src='https://firebasestorage.googleapis.com/v0/b/pelets-af6eb.appspot.com/o/legal%2FPrivacy%20Policy.pdf?alt=media&token=6c082f32-daec-45ff-8a6d-70efa6500aa4'/>
    </div>
  )
}