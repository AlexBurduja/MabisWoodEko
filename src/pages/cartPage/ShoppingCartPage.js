/* eslint-disable jsx-a11y/img-redundant-alt */
import { useContext, useEffect, useState } from 'react';
import "./ShoppingCartPage.css"
import { AiOutlineShopping } from 'react-icons/ai'
import { FaCcVisa, FaCcPaypal, FaCcApplePay, FaCcAmazonPay, FaCcAmex } from 'react-icons/fa'
import { LoginContext } from '../../App';
import { RiShoppingCartLine } from 'react-icons/ri';

export function ShoppingCartPage() {
  
  const [ products, setProducts ] = useState([])
  const { auth } = useContext( LoginContext )


        // useEffect(() => {
        //   fetch(`http://localhost:3001/cart?user=${auth.user.id}`, {
        //     headers : {
        //       Authorization : `Bearer ${auth.accessToken}`
        //     }
        //   })
        //   .then((response) => response.json())
        //   .then((cartList) => {
        //     const [ cart ] = cartList

        //     setProducts(cart.products)
        // })}, [] );

      function ProductCount () {
        if (totalQuantity === 1){
          return <p>{totalQuantity} product</p>
        } else {
          return <p>{totalQuantity} products</p>
        }
      }

      const totalPrice = products.reduce((acc,cur) => {
        return acc + cur.quantity * cur.productPrice
      }, 0)

      const totalQuantity = products.reduce((acc,cur) => {
        return acc+ cur.quantity
      }, 0)

      // function removeHandler(){
      //   fetch(`http://localhost:3001/cart/${auth.user.id}`, {
      //     method: "DELETE",
      //     headers : {
      //       Authorization : `Bearer ${auth.accessToken}`
      //     }
      //   })
      // }

      function ShoppingCartPage() {
        if(totalQuantity === 0) {
          return (
            <div className='emptyCartText'>
            <h1>Your Cart is Empty </h1>
            <p> <RiShoppingCartLine /> </p>
            </div>
          )
        } else {
          return (
            <>
    <div className='pageHeader'>
    <h1>Your cart</h1>
    <AiOutlineShopping />
    </div>
    <section className='wrapper'>
      <section className='cartPageLeftSection'>
      <h1>1. REVIEW YOUR ORDER </h1>
      <h3>Please check that you have the right quantity of every single item to avoid confusions at checkout, Thanks!</h3>
      {products.map((item) => {
        return (
          <section key={item} className='cartProductShowFlex'>
              <div>
                <img src={item.productImage} width="150vw" alt="product image"></img>
              </div>

            <div className='row'>
              <div className='column'>
                <p className='columnProductTitle'>{item.productTitle}</p>
                <p>{item.productKg} Kg</p>
              </div>

              <div className='column'>
                <p>Each</p>
                {item.productPrice} {item.productCurrency}
              </div>

              <div className='column'>
                <p>Quantity</p>
                {item.quantity}
              </div>

              <div className='column'>
                <p>Total</p>
                {item.quantity * item.productPrice} {item.productCurrency}
              </div>

            </div>
          </section>
      )
    })}
      <div className='productCartFooter'>
      <button className="emptyCartButton" >Empty Cart</button>
        <ProductCount />
        <p>Total: {totalPrice} RON</p>
      </div>
    </section>
    <section className='deliveryAddress'>
      <div className='deliveryAddress_wrapper'>
    <div className='deliveryAddress_header'>
        <h1>2. DELIVERY ADDRESS</h1>
        <h3>Please check that all the informations are valid and correct, Thanks!</h3>
        <h5>All fields required.</h5>
      </div>

      <div className="deliveryAddress_inputs">
        <div className='deliveryAddress_inputs__input' >
          <input type="text" required="required" defaultValue={auth.user.email} ></input>
          <span>Email Address</span>
        </div>

        <div className='deliveryAddress_inputs__input input2' >
          <div>
            <input type="text" required="required" defaultValue={auth.user.firstName}></input>
            <span>First name</span>
          </div>

          <div className='lastNameInput'>
            <input type="text" required="required" defaultValue={auth.user.lastName}></input>
            <span>Last name</span>
          </div>
        </div>
        
        <div className='deliveryAddress_inputs__input company'>
          <input type="text" required></input>
          <span>Company (optional)</span>
        </div>

        <div className='deliveryAddress_inputs__input' >
          <input type="text" required="required"></input>
          <span>Telephone</span>
        </div>
        
        <div className='deliveryAddress_inputs__input' >
          <input type="text" required="required"></input>
          <span>Delivery Address</span>
        </div>


        <div className='deliveryAddress_inputs__input towninput' >

          <div className='lastNameInput'>
            <input type="text" required="required"></input>
            <span>Town</span>
          </div>

          <div className='lastNameInput'>
            <input type="text" required="required"></input>
            <span>Country</span>
          </div>

          <div className='lastNameInput'>
            <input type="text" required="required"></input>
            <span>Zip Code</span>
          </div>

        </div>
        
      </div>

      </div>

        <section className='checkoutTab'>
          <div className='checkoutTab_header'>
            <h1>3. CHECKOUT</h1>
            <h3>Order summary</h3>
          </div>

          <section className='doamneAjuta'>
          {products.map((item) => {
            return (
              <section key={item} className='productCheckoutPage'>
                  <div className='imageQuantity'>
                    <img src={item.productImage} alt="product image" width="100px"></img>
                    <p>{item.quantity}</p>
                  </div>
                
                  <p className='productCheckoutPage_Title'>{item.productTitle}</p>
                  <p>{item.quantity * item.productPrice} {item.productCurrency}</p>
                </section>
                )
              })}
              <div className='productCheckoutPage_footer'>
                  <h1>Total</h1>
                <div className='totalQuantityPrice'>
                  <p>Products: <span>{totalQuantity}</span></p>
                  <p>Sub-total: <span>{totalPrice}</span> RON</p>
                </div>

                <div className='deliveryOptions'>
                  <label htmlFor="delivery">Delivery </label>
                  <select id='delivery'>
                    <option value="standard">Standard Delivery</option>
                    <option value="premium">Premium Delivery</option>
                  </select>
                  <button>CHECKOUT</button>
                  <div className='deliveryFooter'>
                    <p>WE ACCEPT:</p>
                    <div className='react-icons'>
                    <FaCcApplePay /> <FaCcPaypal /> <FaCcVisa /> <FaCcAmazonPay /> <FaCcAmex />
                    </div>
                  </div>
                </div>
              </div>
                </section>    
          </section>
      </section>
  </section>
</>
          )
        }
      }

  return (
      <ShoppingCartPage />
  )
}