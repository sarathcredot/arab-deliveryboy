import React from "react";
import boxIcon from "../../assets/images/icons/boxIcon.svg";
import arrowIcon from "../../assets/images/icons/arrowIcon.svg";
import styles from "./style.module.css";
import { useNavigate } from "react-router";

interface IWallet {
  cashInHand: number;
  lastSettlementDate: string;
  totalSettlement: number;
  grandTotal: number;
  numberOfOrderAssigned: number;
  numberOfOrderDelivered: number;
  numberOfReturnOrderAssigned: number;
  numberOfReturnOrderDelivered: number;
  numberOfPendingReturns: number;
  numberOfPendingOrdes: number;
}
interface Props {
  wallet?: IWallet;
}

const OrdersCount = ({ wallet }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.box}
      onClick={() => navigate("/orders")}
    >
      <div className={styles.box_contents}>
        <div className={styles.icon_div}>
          <img
            src={boxIcon}
            alt="icon"
          />
        </div>
        <div className={styles.content}>
          <h3>{wallet?.numberOfOrderAssigned||0}</h3>
          <p
            style={{
              fontSize: "16px",
            }}
          >
            Assigned Orders
          </p>
          <p style={{
            fontSize:"13px"
          }}>
            <span style={{ color: "red" }}>{wallet?.numberOfPendingOrdes||0}</span>{" "}
            Pending Orders
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

export default OrdersCount;
