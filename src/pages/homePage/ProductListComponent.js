import { useEffect, useState } from 'react';
import { ProductCardComponent } from "./ProductCardComponent";
import "./ProductListComponent.css"
import { db } from "../../firebase-config";
import { collection, getDocs } from "firebase/firestore"

export function ProductListComponent() {

  // const url = "http://localhost:3001";
  // const endpoint = "/product";
  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   fetch(url + endpoint)
  //     .then((response) => response.json())
  //     .then((productsFromServer) => setProducts(productsFromServer));
  // }, []);

  const [products, setProducts] = useState([])
  const productCollection = collection(db, "products")

// useEffect(() => {
//   fetch('https://pelets-project-default-rtdb.europe-west1.firebasedatabase.app/product.json')
//     .then((response) => response.json())
//     .then((productsFromServer) => setProducts(productsFromServer))
// }, []);

  /// Get

    useEffect(() => {
      const getProducts = async () => {
        const data = await getDocs(productCollection);
        setProducts(data.docs.map((doc) =>({...doc.data(), id: doc.id})))
      };
      getProducts();
    }, [])

  ///Get ends

  return (
    <section className='listComponent'>
      <header>Products</header>
      <div className='gridUl'>
        {products.map((product) => {
          return (
              <ProductCardComponent
              Title={product.title}
              Kg={product.kg}
              Currency={product.currency}
              Price={product.price}
              Image={product.image}
              Id={product.id}>
              </ProductCardComponent>
          );
        })};
      </div>
    </section>
  );
}
