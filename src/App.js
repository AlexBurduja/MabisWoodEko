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
import { useEffect, useState } from 'react';
import { ProductCardComponent } from './pages/homePage/ProductCardComponent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
          <Header />
          <Image />
          <ImageCards />
          <CreateProduct />
          <ProductListComponent />
          <ShoppingCart />
          <PreFooter />
          
          </>
          }
          ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;

function ShoppingCart() {

  const [cart, setCart] = useState([]);


  ///Fetch Get RestApi
    fetch('http://localhost:3001/cart')
      .then((response) => response.json())
      .then((cartFromServer) => setCart(cartFromServer));

  return (
    <section>
      {cart.map((item) => {
        return (
          <div>
            <p>{item.productTitle}</p>
            <p>{item.quantity}</p>
          </div>
          )
        })}
    </section>
  )
}
