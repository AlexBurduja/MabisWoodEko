import './App.css';
import { CreateProduct } from './pages/homePage/CreateProduct';
import { Header } from './pages/homePage/Header.js';
import { Image } from './pages/homePage/Image';
import { ImageCards } from './pages/homePage/ImageCards';
import { ProductListComponent } from './pages/homePage/ProductListComponent';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";    
import { PreFooter } from './pages/homePage/PreFooter';
import { ShoppingCart } from './pages/homePage/ShoppingCart';
import { ShoppingCartPage } from './pages/homePage/ShoppingCartPage';
import { CartContextProvider } from './pages/homePage/context/CartContext'

function App() {
  return (
  <CartContextProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
            <>
              <Header >
                <ShoppingCart />
              </Header>
              <Image />
              <ImageCards />
              <CreateProduct />
              <ProductListComponent />
              <PreFooter />
            </>
          }></Route>

          <Route path='/cart' element={
            <>
              <Header />
              <ShoppingCartPage />
              <PreFooter />
            </>
          }></Route>
      </Routes>
    </BrowserRouter>
  </CartContextProvider>
  )
}

export default App;