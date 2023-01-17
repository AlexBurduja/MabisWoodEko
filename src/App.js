import './App.css';
import React from "react"
import { BrowserRouter } from 'react-router-dom';
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
import { Form } from './pages/auth/Register/Form';
import { AuthProvider } from './FirebaseAuthContext';
import { CanNavigate } from './CanNavigate';
import { NotificationContainer } from 'react-notifications';

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
            {/* <Route path = '/registerfirebase' element= { <Form/> }></Route>  */}
            <Route path = '/login' element={ <Login /> }></Route>
            <Route path = '/register' element= { <Form/> }></Route>
        </Routes>
      </BrowserRouter>
      <NotificationContainer />
      </AuthProvider>
  )
}

export default App;


