import React from 'react';
import { Footer } from '../homePage/Footer';
import { Header } from '../homePage/Header';
import { PreFooter } from '../homePage/PreFooter';
import { ReviewPageComponent } from './ReviewPageComponent';
import { Reviewpagesomething } from './Reviewpagesomething';


export function ReviewPage() {
  return (
    <>
      <Header />
      <ReviewPageComponent />
      <Reviewpagesomething />
      <PreFooter />
      <Footer />
    </>
  );
}
