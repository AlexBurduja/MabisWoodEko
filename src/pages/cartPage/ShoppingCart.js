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

}, [user, cart.quantity])

useEffect(() => {
    let sum = cart.map(item => item.quantity).reduce((a, b) => a + b, 0);
    console.log(sum)
    setTotal(sum);
}, [cart]);

console.log(total)

function ProductCount () {
  return total === 1 ? <p>{total} product</p> : <p>{total} products</p>
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
