import { useEffect, useState } from 'react';
import './App.css';
import { Header } from './Header.js';
import { Image } from './Image';
import { ImageCards } from './ImageCards';

function App() {
  return (
    <main>
      <Header></Header>
      <Image></Image>
      <ImageCards></ImageCards>
      <ProductListComponent></ProductListComponent>
    </main>
  )
}

export default App;

function ProductListComponent() {
  const url = "http://localhost:3001"
  const endpoint = "/products"
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(url + endpoint)
    .then((response) => response.json())
    .then((moviesFromServer) => setMovies(moviesFromServer) )
  }, [])

  return (
    <section>
      <header>Products</header>

      <ul>
      {
        movies.map((movie) => {
          return(
            <ProductCardComponent 
            Title={movie.title}
            Kg={movie.kg}
            Currency = {movie.currency}
            Price={movie.price}
            Image={movie.image}>
            </ProductCardComponent>
          )
        })
      }
      </ul>
    </section>
  )
}

function ProductCardComponent(props) {
  const { Title, Kg, Price, Currency, Image } = props

  return (
    <li>
      <article>
        <h2>{Title}</h2>

        <p>{Kg}</p>
        <span>{Price} {Currency}</span>

        <img src={Image} alt="productImage"/>
      </article>
    </li>
  )
}
