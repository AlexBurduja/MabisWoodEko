import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import './PrivacyPolicyCss.css';

function PrivacyPolicy() {
  const url = './publicResources/Cookie Policy Mabis Wood Eko.pdf';
  
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
    <Document file={'./publicResources/Cookiee.pdf'} onLoadSuccess={onDocumentLoadSuccess}>
      <Page pageNumber={1} />
      <Page pageNumber={2} />
    </Document>

    <p>
    Page {pageNumber} of {numPages}
    </p>
    </>
  );
}

export default PrivacyPolicy;
