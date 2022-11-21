/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from 'react';
import "./ShoppingCartPage.css"

export function ShoppingCartPage(props) {


  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/cart')
      .then((response) => response.json())
      .then((cartList) => {
        const [ cart ] = cartList

        setProducts(cart.products)
      });
  }, [])



  return (
    <section>
      {products.map((item) => {
        return (
        <div className='cartItems'>
            <img src={item.productImage} alt="Product image should've been here, if not, write us an email!" />

            <p className='productTitle'>{item.productTitle}</p>
            <p className='productTotalPrice'>{item.productPrice} {item.productCurrency}</p>
            <p className='productKg'>{item.productKg} Kg</p>
            <p className='productTotalPriceQty'>Total Price for {item.quantity} {item.productTitle}: {item.productPrice * item.quantity} {item.productCurrency}</p>
          </div>

      )
    })}
    </section>
  )
}