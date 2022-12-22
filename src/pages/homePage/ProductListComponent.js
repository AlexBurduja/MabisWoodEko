import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../App';
import { ProductCardComponent } from "./ProductCardComponent";
import "./ProductCardComponentModal.css"

export function ProductListComponent() {

  const url = "http://localhost:3001";
  const endpoint = "/product";
  const [products, setProducts] = useState([]);

  const { auth } = useContext(AuthContext)

  ///Fetch Get RestApi
  useEffect(() => {
    fetch(url + endpoint, {
      headers: {
        Authorization : `Bearer ${auth.accessToken}`
      }
    })
      .then((response) => response.json())
      .then((productsFromServer) => setProducts(productsFromServer));
  }, []);

  
  // Fetch Get FirebaseApi
  // useEffect(() => {
    //   fetch('https://pelets-project-default-rtdb.europe-west1.firebasedatabase.app/product.json')
    //     .then((response) => response.json())
    //     .then((productsFromServer) => setProducts(productsFromServer))
    // }, []);
    
    /// Get
    // const [products, setProducts] = useState([])
    // const productCollection = collection(db, "products")

    // useEffect(() => {
    //   const getProducts = async () => {
    //     const data = await getDocs(productCollection);
    //     setProducts(data.docs.map((doc) =>({...doc.data(), id: doc.id})))
    //   };
    //   getProducts();
    // }, [productCollection])

  ///Get ends
  
  
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
                id={product.id}>
                </ProductCardComponent>
            )
          })}
      </div>
    </section>
  );
}
