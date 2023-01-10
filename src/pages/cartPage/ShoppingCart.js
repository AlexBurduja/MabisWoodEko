import { RiShoppingCartLine } from 'react-icons/ri';
import { useState, useEffect, useContext } from 'react';
import "./ShoppingCart.css"
import { AuthContext } from '../../App';
import { NavLink } from 'react-router-dom';
import { Button } from 'react';


export function ShoppingCart() {

const [products, setProducts] = useState([]);

// const { auth } = useContext(AuthContext)

  ///Fetch Get RestApi
  useEffect(() => {
    fetch(`http://localhost:3001/cart?user=` ,{
      headers : {
        Authorization : ``
      }
    })
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
  <NavLink to='/cart' id='cartNavlink' >
    <section className='cartSection'>
      <RiShoppingCartLine />
          <ProductCount />
    </section>
  </NavLink>
  );
}
