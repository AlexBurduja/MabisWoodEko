import React, { useState } from "react";

const CartContext = React.createContext ({})
    
export default CartContext;

export const CartContextProvider = props => {
    const [products, setProducts] = useState([]);
    
    return (
        <CartContext.Provider value={ {products: products, setProducts: setProducts} }>
            {props.children}
        </CartContext.Provider>
    )
} 

        
