import { Footer } from '../homePage/Footer.js';
import { Header } from '../homePage/Header.js';
import { PreFooter } from '../homePage/PreFooter';
import { SingleProductPage } from './SingleProductPage';


export function ProductPage() {
  return (
    <>
      <Header />
      <SingleProductPage />
      <PreFooter />
      <Footer />
    </>
  );
}
