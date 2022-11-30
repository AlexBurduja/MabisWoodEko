import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Homepage } from './pages/homePage/Homepage'
import { CartPage } from './pages/homePage/CartPage'
import { ProductPage } from './pages/homePage/ProductPage'
import { ContactPage } from './pages/homePage/ContactPage'
import { Login } from './pages/auth/Login';
import React, { useEffect, useState } from 'react';

export const AuthContext = React.createContext();

function App() {
  const [auth, setAuth] = useState(JSON.parse(window.localStorage.getItem('auth')) || {} )

  useEffect(() => {
    window.localStorage.setItem('auth', JSON.stringify(auth));

    console.log(auth)
  }, [auth]);

  return (
    <AuthContext.Provider value={ { auth, setAuth} }>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Homepage /> }></Route>

            <Route path='/cart' element={ <CartPage /> }></Route>

            <Route path='/products/:id' element={ <ProductPage /> }></Route>

            <Route path='/contact' element={ <ContactPage /> }></Route>

            <Route path ='login' element={ <Login /> }></Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;


