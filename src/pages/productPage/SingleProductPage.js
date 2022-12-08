import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../App";
import "./SingleProductPage.css"
import { motion } from "framer-motion";

export function SingleProductPage() {
  const url = "http://localhost:3001/product"

  let { id } = useParams();
  const [productDetails, setproductDetails] = useState({})

  const { auth } = useContext(AuthContext)
  
  useEffect(() => {
    fetch(`${url}/${id}`, {
      headers: {
        'Authorization': `Bearer ${auth.accessToken}`
      }
    })
    .then((response) => response.json())
    .then((product) => setproductDetails(product))
  }, [])
  
  return (
    
    <section>
      <div className="product">

        <div className="productDescription">
          <p>{productDetails.description}</p>
          <p>{productDetails.kg} Kg </p>
        </div>
        
        <div className="product-img">
          <motion.img
          whileHover={{scale:1.1}}
          whileTap={{scale:0.9}}
          src={productDetails.image} alt="productImage"></motion.img>
        </div>

        <div className="productInfo">
            <h1>{productDetails.title}</h1>
            <p>Works best with a thermal plant.</p>
            <p>{productDetails.price} {productDetails.currency}</p>
            <motion.button 
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}>
                Add to Cart
            </motion.button>
        </div>
      
      </div>
    </section>
  );
}
