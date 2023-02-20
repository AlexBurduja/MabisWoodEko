import React from 'react'
import { useState } from 'react';
import { Document, Page } from 'react-pdf'
import pdf from './publicResources/Privacy Policy Mabis Wood Eko.pdf'
import './PrivacyPolicyCss.css'

function PrivacyPolicy() {
  
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

    return (
        // <div className='divPrivacy'>
        //     <iframe src={pdf} title="privacyPdf" width='100%' height='100%' className='iframePrivacy'/>
        // </div>
        <Document file={pdf} >
            <Page pageNumber={1} />
        </Document>
  )
}

export default PrivacyPolicy
