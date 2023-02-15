import './App.css';
import React from "react"
import { BrowserRouter, createBrowserRouter } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Homepage } from './pages/homePage/Homepage'
import { CartPage } from './pages/cartPage/CartPage'
import { ProductPage } from './pages/productPage/ProductPage'
import { ContactPage } from './pages/contactPage/ContactPage'
import { Login } from './pages/auth/Login';
import { ProfilePage } from './pages/auth/ProfilePage.js';
import { ReviewPage } from './pages/reviewPage/ReviewPage';
import { AdminPanelList } from './pages/adminPanel/AdminPanelList';
import { Register } from './pages/auth/Register/Register';
import { AuthProvider } from './FirebaseAuthContext';
import { CanNavigate } from './CanNavigate';
import Loading from './pages/reusableComponents/Loading';
import SuccessPage from './pages/reusableComponents/SuccessPage';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router-dom';
import CancelPage from './pages/reusableComponents/CancelPage';

export const LoginContext = React.createContext();


function App() {

  return (
        <AuthProvider>
    <BrowserRouter >
        <Routes>

      <Route path='/' element = {
        <Homepage />
      }>
      </Route>

            <Route path='/loading' element={
              <Loading />
            }></Route>

            <Route path='/cart' element={ 
              <CartPage />
            }></Route>

            <Route path='/products/:id' element={ 
              <ProductPage /> 
            }></Route>

            <Route path='/contact' element={ 
              <ContactPage />
            }></Route>

            <Route path='/reviews' element={ 
              <ReviewPage />
            }></Route>

            <Route path = '/profile' element={ 
              <ProfilePage /> 
              } ></Route>

              <Route path = '/panel' element={
                <CanNavigate>
                  <AdminPanelList />
                </CanNavigate>
              }></Route>

              <Route path='/success' element={ 
                <SuccessPage/> 
              }></Route>

              <Route path='/cancel' element={
                <CancelPage />
              }></Route>

            <Route path = '/login' element={ <Login /> }></Route>
            <Route path = '/register' element= { <Register/> }></Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
  )
}

export default App;


