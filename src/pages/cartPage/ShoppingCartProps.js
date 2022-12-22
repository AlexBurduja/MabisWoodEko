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

    return (
        <>
        </>
    )
}