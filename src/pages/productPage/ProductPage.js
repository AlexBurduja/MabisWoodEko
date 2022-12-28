import { Footer } from '../reusableComponents/Footer';
import { Header } from '../reusableComponents/Header.js';
import { PreFooter } from '../reusableComponents/PreFooter';
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
