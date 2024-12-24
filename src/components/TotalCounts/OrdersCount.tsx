import React from "react";
import boxIcon from "../../assets/images/icons/boxIcon.svg";
import arrowIcon from "../../assets/images/icons/arrowIcon.svg";
const OrdersCount = () => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        padding: 10,
        cursor:"pointer"
      }}
    >
      <div
        style={{
          background: "#F8F8F8",
          borderRadius: "50%",
          width: "70px",
          height: "70px",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          padding: "20px",
        }}
      >
        <img
          src={boxIcon}
          alt="icon"
        />
      </div>
      <div>
        <h3>50</h3>
        <p>Assigned Orders</p>
        <p>10 Pending Orders</p>
      </div>
      <img
        src={arrowIcon}
        alt="icon"
      />
    </div>
  );
};

export default OrdersCount;
