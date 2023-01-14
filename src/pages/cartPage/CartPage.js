import { Footer } from '../reusableComponents/Footer';
import { Header } from '../reusableComponents/Header';
import { PreFooter } from '../reusableComponents/PreFooter';
import { BackToTop } from '../reusableComponents/BackToTop';
import { ShoppingCartPage } from './ShoppingCartPage';
import TopScrollProgress from '../reusableComponents/TopScrollProgress';
import { ProductListComponent } from '../homePage/ProductListComponent';
import { ShoppingCart } from './ShoppingCart';
import { ShopCartGet } from './ShopCartGet';


export function CartPage() {
  return (
    <>
      <TopScrollProgress />
      <Header />
        <ShoppingCartPage />
      <BackToTop />
      <PreFooter />
      <Footer />
    </>
  );
}
