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
import { useEffect } from 'react';
import { ProductCardComponent } from './pages/homePage/ProductCardComponent';
import { ShoppingCart } from './pages/homePage/ShoppingCart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
          <Header>
            <ShoppingCart />
          </Header>
          <Image />
          <ImageCards />
          <CreateProduct />
          <ProductListComponent />
          <PreFooter />
          
          </>
          }
          ></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;


