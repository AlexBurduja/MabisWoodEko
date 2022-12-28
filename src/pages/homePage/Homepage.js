import { CreateProduct } from './CreateProduct';
import { Header } from './Header.js';
import { Image } from './Image';
import { ImageCards } from './ImageCards';
import { ProductListComponent } from './ProductListComponent';
import { PreFooter } from './PreFooter';
import { ShoppingCart } from "../cartPage/ShoppingCart";
import { Footer } from './Footer';
import { BackToTop } from '../cartPage/BackToTop';

export function Homepage() {

  return (
    <>
      <Header >
        <ShoppingCart />
      </Header>
      <Image />
      <ImageCards />
      <CreateProduct />
      <ProductListComponent />
      <BackToTop />
      <PreFooter />
      <Footer />
    </>
  );
}
