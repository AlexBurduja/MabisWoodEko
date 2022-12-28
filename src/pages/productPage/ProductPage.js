import { Footer } from '../reusableComponents/Footer';
import { Header } from '../reusableComponents/Header.js';
import { PreFooter } from '../reusableComponents/PreFooter';
import TopScrollProgress from '../reusableComponents/TopScrollProgress';
import { SingleProductPage } from './SingleProductPage';


export function ProductPage() {
  return (
    <>
      <TopScrollProgress />
      <Header />
      <SingleProductPage />
      <PreFooter />
      <Footer />
    </>
  );
}
