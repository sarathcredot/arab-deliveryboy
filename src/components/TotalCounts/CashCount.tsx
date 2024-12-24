import React from "react";
import cashIcon from "../../assets/images/icons/cashIcon.svg";
import arrowIcon from "../../assets/images/icons/arrowIcon.svg";
import styles from "./style.module.css";
import { useNavigate } from "react-router";
const CashCount = () => {
    const navigate = useNavigate()
  return (
    <div className={styles.box} onClick={()=> navigate("/settlements")}>
      <div className={styles.box_contents}>
        <div className={styles.icon_div}>
          <img
            src={cashIcon}
            alt="icon"
          />
        </div>
        <div className={styles.content}>
          <h3>526.81 OMR</h3>
          <p>Cash in Hand</p>
          <p>
            <span style={{ color: "red" }}>526 OMR </span> to Settle
          </p>
        </div>
      </div>
      <img
        src={arrowIcon}
        alt="icon"
      />
    </div>
  );
};

export default CashCount;
