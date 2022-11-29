import { RiShoppingCartLine } from 'react-icons/ri'
import { NavLink } from 'react-router-dom';
import { useState, useEffect } from 'react';
import "./ShoppingCart.css"


export function ShoppingCart() {

const [products, setProducts] = useState([]);

  ///Fetch Get RestApi
  useEffect(() => {
    fetch('http://localhost:3001/cart')
      .then((response) => response.json())
      .then((cartList) => {
        const [ cart ] = cartList

        setProducts(cart.products)
      });
    }, [])
    
    const totalQ = products.reduce((acc,curr) => {
      return acc + curr.quantity
    }, 0)


    function ProductCount () {
      if (totalQ === 1){
        return <p>{totalQ} product</p>
      } else {
        return <p>{totalQ} products</p>
      }
    }

  return (
   <NavLink to='/cart' id='cartNavlink'>
    <section className='cartSectionn'>
      <RiShoppingCartLine />
          <ProductCount />
    </section>
  </NavLink>
  );
}
