import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { FirebaseAuthContext } from "../../FirebaseAuthContext";
import { ShoppingCartPage } from "./ShoppingCartPage";

export function ShopCartGet(){

    const { user } = useContext(FirebaseAuthContext)

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
    }, [])



    return (
    <>
        {cart.map((item) => (
        <ShoppingCartPage
        currency = {item.currency}
        image = {item.image}
        kg = {item.kg}
        price = {item.price}
        quantity = {item.quantity}
        title = {item.title}
        id = {item.id}
        key = {item.id}
        >
        </ShoppingCartPage>
        ))}
    </>
    )
}