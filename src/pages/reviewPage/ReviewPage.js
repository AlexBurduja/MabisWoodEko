import React from 'react';
import { Header } from '../homePage/Header';
import { PreFooter } from '../homePage/PreFooter';
import { ReviewPageComponent } from './ReviewPageComponent';


export function ReviewPage() {
  return (
    <>
      <Header />
      <ReviewPageComponent />
      <PreFooter />
    </>
  );
}
