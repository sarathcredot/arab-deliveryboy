import React from "react";
import warrantyIcon from "../../assets/images/icons/warrantyIcon.svg";
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
}
interface Props {
  wallet?: IWallet;
}

const WarrantyCount = ({ wallet }: Props) => {
  const navigate = useNavigate();
  return (
    <div
      className={styles.box}
      onClick={() => navigate("/returns")}
    >
      <div className={styles.box_contents}>
        <div className={styles.icon_div}>
          <img
            className={styles?.third}
            src={warrantyIcon}
            alt="icon"
          />
        </div>
        <div className={styles.content}>
          <h3>{wallet?.numberOfReturnOrderAssigned||0}</h3>
          <p style={{
              fontSize: "16px",
            }}>Warranty Pickups</p>
          <p style={{
              fontSize: "13px",
            }}>
            <span style={{ color: "red" }}>
              {wallet?.numberOfPendingReturns||0}
            </span>{" "}
            Pending Warranty Pickups
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

export default WarrantyCount;
