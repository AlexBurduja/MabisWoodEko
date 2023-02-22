import React from 'react'
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf'

const pdf= './publicResources/Privacy Policy Mabis Wood Eko (2).pdf';
export function PrivacyPolicy() {
  
  pdfjs.GlobalWorkerOptions.workerSrc = 
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  return (
    <Document file={'https://firebasestorage.googleapis.com/v0/b/pelets-af6eb.appspot.com/o/legal%2FPrivacy%20Policy%20Mabis%20Wood%20Eko.pdf?alt=media&token=8352d367-a1b0-4f85-ac0c-56678044fece'} options={{}} >
      <Page pageNumber={1}/>
    </Document>
  )
}