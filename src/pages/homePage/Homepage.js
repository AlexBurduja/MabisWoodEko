import { CreateProduct } from './CreateProduct';
import { Header } from '../reusableComponents/Header';
import { Image } from './Image';
import { ImageCards } from './ImageCards';
import { ProductListComponent } from './ProductListComponent';
import { PreFooter } from '../reusableComponents/PreFooter';
import { ShoppingCart } from "../cartPage/ShoppingCart";
import { Footer } from '../reusableComponents/Footer';
import { BackToTop } from '../reusableComponents/BackToTop';

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
