import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { LoginContext } from "../../App";
import "./SingleProductPage.css"
import { motion } from "framer-motion";
import { HashLink } from "react-router-hash-link/dist/react-router-hash-link.cjs.production";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";

export function SingleProductPage() {

  let { id } = useParams();
  const [productDetails, setproductDetails] = useState({})

useEffect(() => {

  const ref = collection(db, `/products/${id}`, id)
  
    const getProduct = async () => {
      const data = await getDocs(ref)
      
      setproductDetails(data.docs.map((doc) => doc.data()))
    }
    
    getProduct();
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
