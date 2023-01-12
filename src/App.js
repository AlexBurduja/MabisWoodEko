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
import { Register } from './pages/auth/Register';
import React from "react"
import { ProfilePage } from './pages/auth/ProfilePage.js';
import { ReviewPage } from './pages/reviewPage/ReviewPage';
import { AdminPanelList } from './pages/adminPanel/AdminPanelList';
import { RegisterFirebase } from './RegisterFirebase';
import { AuthProvider } from './FirebaseAuthContext';
import { CanNavigate } from './CanNavigate';

export const LoginContext = React.createContext();



function App() {

  return (
        <AuthProvider>
    <BrowserRouter>
        <Routes>

      <Route path='/' element = {
        <Homepage />
      }>
      </Route>
          

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

              <Route path = '/users' element={
                <CanNavigate>
                  <AdminPanelList />
                </CanNavigate>
              }></Route>

            {/* <Route path = '/loginfirebase' element={ <Login /> }></Route> */}
            <Route path = '/registerfirebase' element= { <RegisterFirebase/> }></Route> 
            <Route path = '/login' element={ <Login /> }></Route>
            <Route path = '/register' element= { <Register/> }></Route>
        </Routes>
      </BrowserRouter>
      </AuthProvider>
  )
}

export default App;


