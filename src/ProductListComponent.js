import { useEffect, useState } from 'react';
import { ProductCardComponent } from "./ProductCardComponent";
import "./ProductListComponent.css"

export function ProductListComponent() {
  const url = "http://localhost:3001";
  const endpoint = "/products";
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(url + endpoint)
      .then((response) => response.json())
      .then((moviesFromServer) => setMovies(moviesFromServer));
  }, []);

  return (
    <section>
      <header>Products</header>
      <div className='gridUl'>
        {movies.map((movie) => {
          return (
            <ProductCardComponent
              Title={movie.title}
              Kg={movie.kg}
              Currency={movie.currency}
              Price={movie.price}
              Image={movie.image}>
            </ProductCardComponent>
          );
        })}
      </div>
    </section>
  );
}
