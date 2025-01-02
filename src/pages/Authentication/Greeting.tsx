import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../../assets/images/greetlogo.svg"


const Greeting = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="greeting-page">
      <div className="greeting-content">
        <h1>Begin your selling journey on Arabdeals</h1>
      </div>
      <img src={logo} alt="Above Button" className="above-button-img" />
      <button className="get-started-btn" onClick={handleLogin}>
        Get Started
      </button>
    </div>
  );
}; 

export default Greeting;
