import React from 'react';
import { BackToTop } from '../reusableComponents/BackToTop';
import { Footer } from '../reusableComponents/Footer';
import { Header } from '../reusableComponents/Header';
import { PreFooter } from '../reusableComponents/PreFooter';
import TopScrollProgress from '../reusableComponents/TopScrollProgress';
import { AdminPanelFetch } from './AdminPanelFetch';

export function AdminPanelList() {
  
  
  return (
    <>
      <TopScrollProgress />
      <Header />
      <AdminPanelFetch />
      <BackToTop />
      <PreFooter />
      <Footer />  
    </>
  );
}
