import './App.css';
import { CreateProduct } from './CreateProduct';
import { Header } from './Header.js';
import { Image } from './Image';
import { ImageCards } from './ImageCards';
import { ProductListComponent } from './ProductListComponent';      

function App() {
  return (
    <main>
      <Header></Header>
      <Image></Image>
      <ImageCards></ImageCards>
      <CreateProduct></CreateProduct>
      <ProductListComponent></ProductListComponent>
    </main>
  )
}

export default App;


