import React from 'react'
import { useState } from 'react';
import { Document, Page } from 'react-pdf'
import pdf from './publicResources/Privacy Policy Mabis Wood Eko.pdf'

function PrivacyPolicy() {
  
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

    return (
    <div>
    <Document file={'./publicResources/Privacy Policy Mabis Wood Eko.pdf'} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
    </Document>
    <p>
        Page {pageNumber} of {numPages}
  </p>
  </div>
  )
}

export default PrivacyPolicy
