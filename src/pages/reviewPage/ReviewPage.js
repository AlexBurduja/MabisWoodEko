import React from 'react';
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
    </>
  );
}
