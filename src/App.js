import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Homepage } from './pages/homePage/Homepage'
import { CartPage } from './pages/homePage/CartPage'
import { ProductPage } from './pages/homePage/ProductPage'
import { ContactPage } from './pages/homePage/ContactPage'
import { Login } from './pages/auth/Login';
import { AuthContextProvider } from './pages/auth/auth-context';
import React, { useContext } from 'react';

export const AuthContext = React.createContext();

function CanNavigate({ children }) {
  const { auth } = useContext(AuthContext)

  if(auth?.accessToken){
    return ( children )
  } else {
    return <Navigate to="/login" replace={true} />
  }
}



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

            <Route path ='login' element={ <Login /> }></Route>
        </Routes>
    </AuthContextProvider>
      </BrowserRouter>
  )
}

export default App;


