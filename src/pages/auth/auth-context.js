import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../App";

export function AuthContextProvider(props) {
    const { children } = props
    const [auth, setAuth] = useState(JSON.parse(window.localStorage.getItem('auth')) || {} )
    
    const navigate = useNavigate();

    useEffect(() => {
      window.localStorage.setItem('auth', JSON.stringify(auth));
      
    }, [auth]);

    function logOut() {
        window.localStorage.removeItem('auth');
        setAuth({});
        navigate('/login');
    }

    return ( 
        <AuthContext.Provider value={{ auth, setAuth, logOut }}>
            { children }
        </AuthContext.Provider>
    )
}