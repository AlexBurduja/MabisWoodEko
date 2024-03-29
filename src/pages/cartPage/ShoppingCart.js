import { RiShoppingCartLine } from 'react-icons/ri';
import { useState, useEffect, useContext, useCallback } from 'react';
import "./ShoppingCart.css"
import { NavLink } from 'react-router-dom';
import { FirebaseAuthContext } from '../../FirebaseAuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';


export function ShoppingCart() {
  
const { user } = useContext( FirebaseAuthContext )

const [total, setTotal] = useState(0)
const [ cart, setCart ] = useState([])
const [cartState, setCartState] = useState(cart)


const getCart = useCallback(async () =>{
  if(user?.uid){
    const cartDoc = `users/${user.uid}/cart`
    const ref = collection(db, cartDoc)

    let data = await getDocs(ref)
    setCart(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  } else {
    const clientId = sessionStorage.getItem("clientId")
    const cartDoc = `guestCarts/${clientId}/cart`
    const ref = collection(db, cartDoc)

    let data = await getDocs(ref)
    setCart(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  }
}, [user] )

useEffect(() => {
  getCart().then(() => {
    const sum = cart.map(item => item.quantity).reduce((a, b) => a + b, 0);
    setTotal(sum);
  });
}, [getCart, cart]);

function ProductCount () {
  return <p>
    {localStorage.getItem('language') === "RO" ?
  (total === 1 ? `${total} produs` : `${total} produse`) :
 localStorage.getItem('language') === "IT" ?
  (total === 1 ? `${total} prodotto` : `${total} prodotti`) :
 localStorage.getItem('language') === "DE" ?
  (total === 1 ? `${total} produkt` : `${total} produkte`) :
  localStorage.getItem('language') === "FR" ? 
  (total === 1 ? `${total} produit` : `${total} produits`) :
 (total === 1 ? `${total} product` : `${total} products`)}
 </p>
}



  return (
  <NavLink to='/cart' id='cartNavlink' >
    <section className='cartSection'>
      <RiShoppingCartLine />
          <ProductCount />
    </section>
  </NavLink>
  );
}
