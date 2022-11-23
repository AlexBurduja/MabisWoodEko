/* eslint-disable jsx-a11y/img-redundant-alt */
import { useEffect, useState } from 'react';
import "./ShoppingCartPage.css"

export function ShoppingCartPage() {

  const [products, setProducts] = useState([])
     

  useEffect(() => {
    fetch('http://localhost:3001/cart')
    .then((response) => response.json())
    .then((cartList) => {
      const [ cart ] = cartList

      setProducts(cart.products)
  })}, [] );
    


  return (
    <section className='wrapper'>
      <h1>1. REVIEW YOUR ORDER </h1>
      <h3>Please check that you have the right quantity of every single item to avoid confusions at checkout, Thanks!</h3>
      {products.map((item) => {
        return (
          <section className='cartPageLeftSection'>
            <table className='desktopTable'>
              <tr className='firstRow'>
                <th>Image</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Kilograms</th>
                <th>Total Price of {item.quantity} "{item.productTitle}"</th>
              </tr>

              <tr className='hover'>
                <td>
              <img src={item.productImage} className="tableImg" width="100px" alt="Product image should've been here, if not, write us an email!" />
                </td>
                <td>
              {item.productTitle}
                </td>
                <td>
              {item.quantity}
                </td>
                <td>
              {item.productPrice} {item.productCurrency}
                </td>
                <td>
              {item.productKg}
                </td>
                <td>
              {item.productPrice * item.quantity} {item.productCurrency}
                </td>
              </tr>
        </table>

            <table className='mobileTable'>
              <tr>
                <th>Image</th>
                  <td>
                    <img src={item.productImage} className="mobileTableImg" alt="Product image should've been here, if not, write us an email!" />
                  </td>
              </tr>
              <tr>
                <th>Product</th>
                  <td>
                    {item.productTitle}
                  </td>
              </tr>
              <tr>
                <th>Quantity</th>
                  <td>
                    {item.quantity}
                  </td>
              </tr>
              <tr>
                <th>Price</th>
                  <td>
                    {item.productPrice} {item.productCurrency}
                  </td>
              </tr>
              <tr>
                <th>Kilograms</th>
                  <td>
                    {item.productKg}
                  </td>
              </tr>
              <tr>
                <th>Total Price of {item.quantity} "{item.productTitle}"
                </th>
                  <td>
                    {item.productPrice * item.quantity} {item.productCurrency}
                  </td>
              </tr>
            </table>
          </section>
      )
})}
      <p></p>
    </section>
  )
  }