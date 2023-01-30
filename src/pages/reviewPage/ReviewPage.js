import React from 'react';
import { BackToTop } from '../reusableComponents/BackToTop';
import { Footer } from '../reusableComponents/Footer';
import { Header } from '../reusableComponents/Header';
import { PreFooter } from '../reusableComponents/PreFooter';
import TopScrollProgress from '../reusableComponents/TopScrollProgress';
import { ReviewPageComponent } from './ReviewPageComponent';
import { Reviewpagesomething } from './Reviewpagesomething';


export function ReviewPage() {
  return (
    <>
      <TopScrollProgress />
      <Header />
      <Reviewpagesomething />
      <BackToTop />
      <PreFooter />
      <Footer />
    </>
  );
}
