import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import { ProductCardComponent } from "./ProductCardComponent";
import "./ProductCardComponentModal.css"
import Loading  from "../reusableComponents/Loading"

export function ProductListComponent() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true)

  
  const ref = collection(db , 'products')

useEffect(() => {
  const getProducts = async () => {
    const data = await getDocs(ref)

    setProducts(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    setLoading(false)
  }

  getProducts();
}, [])

  
  return (
    <section className='listComponent'>
      <header>Products</header>
      {loading ? <Loading /> :
      <div className='gridUl'>
        {products.map((product) => {
          return (
            <>
                <ProductCardComponent
                title={product.title}
                kg={product.kg}
                currency={product.currency}
                price={product.price}
                image={product.image}
                description = {product.description}
                stripeId = {product.stripeId}
                id={product.id}>
                </ProductCardComponent>
              </>
            )
          })}
      </div>
      }
    </section>

    )
}
