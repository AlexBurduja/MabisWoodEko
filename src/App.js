import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Homepage } from './pages/homePage/Homepage'
import { CartPage } from './pages/cartPage/CartPage'
import { ProductPage } from './pages/productPage/ProductPage'
import { ContactPage } from './pages/contactPage/ContactPage'
import { Login } from './pages/auth/Login';
import { AuthContextProvider } from './pages/auth/auth-context';
import React from 'react';
import { CanNavigate } from './pages/auth/CanNavigate';
import { Register } from './pages/auth/Register';
import { ProfilePage } from './pages/auth/ProfilePage.js';
import { ReviewPage } from './pages/reviewPage/ReviewPage';

export const AuthContext = React.createContext();

function App() {

  return (
    <BrowserRouter>
    <AuthContextProvider>
        <Routes>
          <Route path="/" element={ 
            <CanNavigate> 
              <Homepage />
            </CanNavigate> 
        }></Route>

            <Route path='/cart' element={ 
            <CanNavigate>
              <CartPage />
            </CanNavigate>
            }></Route>

            <Route path='/products/:id' element={ 
            <CanNavigate>
              <ProductPage /> 
            </CanNavigate>
            }></Route>

            <Route path='/contact' element={ 
            <CanNavigate>
              <ContactPage />
            </CanNavigate>
            }></Route>

            <Route path='/reviews' element={ 
            <CanNavigate>
              <ReviewPage />
            </CanNavigate>
            }></Route>

            <Route path = '/profile' element={ 
            <CanNavigate> 
              <ProfilePage /> 
            </CanNavigate>
              } ></Route>

            <Route path = '/login' element={ <Login /> }></Route>
            <Route path = '/register' element= { <Register/> }></Route>
        </Routes>
    </AuthContextProvider>
      </BrowserRouter>
  )
}

export default App;

