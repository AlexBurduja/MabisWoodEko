import { Footer } from '../homePage/Footer';
import { Header } from '../homePage/Header';
import { PreFooter } from '../homePage/PreFooter';
import { BackToTop } from './BackToTop';
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
