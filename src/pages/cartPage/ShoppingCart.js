import { RiShoppingCartLine } from 'react-icons/ri';
import { useState, useEffect, useContext } from 'react';
import "./ShoppingCart.css"
import { LoginContext } from '../../App';
import { NavLink } from 'react-router-dom';
import { Button } from 'react';
import { FirebaseAuthContext } from '../../FirebaseAuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';


export function ShoppingCart() {

const [products, setProducts] = useState([]);

const { user } = useContext( FirebaseAuthContext )

const [ cart, setCart ] = useState([])
const [isLoading, setIsLoading] = useState(false)

// useEffect(() => {
//     if(user?.uid){

      
//       getCart()
//       console.log(getCart)
//     }
//   }, [])



useEffect(() => {
  const getCart = async () =>{
    setIsLoading(false)
    
    const cartDoc = `users/${user.uid}/cart`
      const ref = collection(db, cartDoc)
  
      let data = await getDocs(ref)
      setCart(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  
      setIsLoading(true)
    };
       
    getCart()
}, [])




let sum = 0
const totalquantity = cart.forEach(value => sum+= value.quantity)


// console.log(quantity)
function ProductCount () {
  if (sum === 1){
    return <p>{sum} product</p>
  } else {
    return <p>{sum} products</p>
  }
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
