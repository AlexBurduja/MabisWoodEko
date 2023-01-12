import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../App";
import "./SingleProductPage.css"
import { motion } from "framer-motion";
import { HashLink } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";

export function SingleProductPage() {

  const url = "http://localhost:3001/product"

  let { id } = useParams();
  const [productDetails, setproductDetails] = useState({})

  const { auth } = useContext(LoginContext)
  
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
            <p>Works best with a thermal plant.</p>
            <h1>{productDetails.title}</h1>
            <p>{productDetails.price} {productDetails.currency}</p>
              <HashLink to="/#product">
              <motion.button
            whileHover={{scale: 1.1}}
            whileTap={{scale: 0.9}}>
                Back to all products
            </motion.button>
              </HashLink>
        </div>
      
      </div>
    </section>
  );
}
