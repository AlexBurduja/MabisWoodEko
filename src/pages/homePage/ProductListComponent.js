import { collection, getDocs } from 'firebase/firestore';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import { db } from '../../firebase-config';
import { ProductCardComponent } from "./ProductCardComponent";
import "./ProductCardComponentModal.css"

export function ProductListComponent() {

  const url = "http://localhost:3001";
  const endpoint = "/product";
  const [products, setProducts] = useState([]);

  // const { auth } = useContext(AuthContext)

  ///Fetch Get RestApi
  // useEffect(() => {
  //   fetch(url + endpoint, {
  //     headers: {
  //       Authorization : `Bearer ${auth.accessToken}`
  //     }
  //   })
  //     .then((response) => response.json())
  //     .then((productsFromServer) => setProducts(productsFromServer));
  // }, []);

  
  const ref = collection(db , 'products')

useEffect(() => {
  const getProducts = async () => {
    const data = await getDocs(ref)

    setProducts(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
  }

  getProducts();
}, [collection])
  
  
  return (
    <section className='listComponent'>
      <header>Products</header>
      <div className='gridUl'>
        {products.map((product) => {
            return (
                <ProductCardComponent
                title={product.title}
                kg={product.kg}
                currency={product.currency}
                price={product.price}
                image={product.image}
                description = {product.description}
                id={product.id}
                key={product.id}>
                </ProductCardComponent>
            )
          })}
      </div>
    </section>
  );
}
