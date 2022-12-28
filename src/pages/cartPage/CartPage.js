import { Footer } from '../reusableComponents/Footer';
import { Header } from '../reusableComponents/Header';
import { PreFooter } from '../reusableComponents/PreFooter';
import { BackToTop } from '../reusableComponents/BackToTop';
import { ShoppingCartPage } from './ShoppingCartPage';


export function CartPage() {
  return (
    <>
      <Header />
      <ShoppingCartPage />
      <BackToTop />
      <PreFooter />
      <Footer />
    </>
  );
}
