import './App.css';
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
      <ProductListComponent></ProductListComponent>
    </main>
  )
}

export default App;


