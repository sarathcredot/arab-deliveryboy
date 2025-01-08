import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import useWindowWidth from "src/hooks/useWindowWidth";


const Authmiddleware = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const width = useWindowWidth(); 

  useEffect(() => {
    const token = localStorage.getItem("agent_token");
    console.log("Checking token:", token);
    if (token) {
      setIsAuthenticated(true);
    } else {
      console.log("Redirecting to /login");
      if(width <= 680){
        navigate("/greeting")
      }else{
        navigate("/login");
      }
     
    }
  }, [navigate,isAuthenticated]);

  

    return <React.Fragment>{props.children}</React.Fragment>
 
};

export default Authmiddleware;
