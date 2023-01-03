import React from 'react';
import { Footer } from '../reusableComponents/Footer';
import { Header } from '../reusableComponents/Header';
import { PreFooter } from '../reusableComponents/PreFooter';
import { AdminPanelFetch } from './AdminPanelFetch';

export function AdminPanelList() {
  
  
  return (
    <>
      <Header />
      <AdminPanelFetch />
      <PreFooter />
      <Footer />  
    </>
  );
}
