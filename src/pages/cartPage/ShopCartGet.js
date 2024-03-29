import { collection, getDocs } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase-config";
import { FirebaseAuthContext } from "../../FirebaseAuthContext";
import { ShoppingCartPage } from "./ShoppingCartPage";

export function ShopCartGet(){

    const { user } = useContext(FirebaseAuthContext)
    const [titles, setTitles] = useState([])
    const ref = collection(db , 'products')

    useEffect(() => {
        function getTitles(){
      
          const getProducts = async () => {
            let data = await getDocs(ref)
            
            setTitles(data.docs.map((doc) => (doc.data())))
            // setKg(data.docs.map((doc) => (doc.data().kg)))
          }
          
          getProducts()
        }
      
        getTitles()
      }, [])



    return (
    <>
        {titles.map((item) => (
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