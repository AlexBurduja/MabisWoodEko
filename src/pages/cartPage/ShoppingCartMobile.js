import { RiShoppingCartLine } from 'react-icons/ri';
import { useState, useEffect, useContext } from 'react';
import "./ShoppingCartMobile.css"
import { NavLink } from 'react-router-dom';
import { FirebaseAuthContext } from '../../FirebaseAuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
 


export function ShoppingCartMobile() {

const { user } = useContext( FirebaseAuthContext )


const [ cart, setCart ] = useState([])


useEffect(() => {
  if(user?.uid){

    const getCart = async () =>{
      
      const cartDoc = `users/${user.uid}/cart`
      const ref = collection(db, cartDoc)
      
      
      let data = await getDocs(ref)
      
      setCart(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };
    
    getCart()
  }

  if(!user?.uid){
    const clientId = sessionStorage.getItem("clientId")

    const getCart = async () => {
      const cartDoc = `guestCarts/${clientId}/cart`
      const ref = collection(db, cartDoc)

      let data = await getDocs(ref)

      setCart(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    };

    getCart()
  }

}, [user])

let sum = 0
const totalquantity = cart.forEach(value => sum+= value.quantity)


  return (
  <NavLink to='/cart' id='cartNavlink' >
    <section className='cartSectionMobile'>
      <RiShoppingCartLine />
      <div className='productCountMobileBackground'>
          <p className='productCountMobile'>{sum}</p>
      </div>
    </section>
  </NavLink>
  );
}
