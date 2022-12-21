import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../App"
import { ShoppingCartPage } from "./ShoppingCartPage";



export function ShoppingCartProps(){
    const [products, setProducts] = useState([])
    const [cartid , setCartid] = useState([])
    const { auth } = useContext(AuthContext)

    useEffect(() => {
        fetch(`http://localhost:3001/cart?user=${auth.user.id}`, {
            headers: {
                Authorization : `Bearer ${auth.accessToken}`
            }
        })
            .then ((response) => response.json())
            .then (cartlist => {
                const [ cart ] = cartlist
                setProducts(cart.products)

                setCartid(cartlist)
            })
    }, [] );

    cartid.map((item) => console.log(item.id))

    return (
        <>
        {cartid.map((id) => (
            <ShoppingCartPage 
            cartId= {id.id}
            >
            </ShoppingCartPage>
        ))}
        {products.map((item) => (
            <ShoppingCartPage
            id = { item.productId }
            title = {item.productTitle}
            image = {item.productImage}
            price = {item.productPrice}
            currency = {item.productCurrency}
            kg = {item.productKg}
            quantity = {item.quantity}
            ></ShoppingCartPage>
        ))}
        </>
    )
}