import { Header } from '../homePage/Header';
import { PreFooter } from '../homePage/PreFooter';
import { ShoppingCartPage } from './ShoppingCartPage';
import { ShoppingCartProps } from './ShoppingCartProps';


export function CartPage() {
  return (
    <>
      <Header />
      <ShoppingCartProps />
      <ShoppingCartPage />
      <PreFooter />
    </>
  );
}
