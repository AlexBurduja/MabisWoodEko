import { useEffect, useState } from 'react';
import { ProductCardComponent } from "./ProductCardComponent";
import "./ProductListComponent.css"

export function ProductListComponent() {

  const url = "http://localhost:3001";
  const endpoint = "/product";
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(url + endpoint)
      .then((response) => response.json())
      .then((productsFromServer) => setProducts(productsFromServer));
  }, []);

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
              id = {product.id}
              key = {product.id}> 
            </ProductCardComponent>
          );
        })};
      </div>
    </section>
  );
}
