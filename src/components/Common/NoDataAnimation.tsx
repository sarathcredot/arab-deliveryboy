import React from 'react'
import animation from "./noDataAnimation.json"
import Lottie from "lottie-react";
const NoDataAnimation = ({message}:any) => {
  return (
    <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "20px",
          }}    
        >
          <Lottie
            animationData={animation}
            style={{ width: "200px" }}
          />
          <h3>{message}</h3>
        </div>
  )
}

export default NoDataAnimation