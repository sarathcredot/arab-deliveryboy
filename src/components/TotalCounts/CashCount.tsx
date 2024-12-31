import React from "react";
import cashIcon from "../../assets/images/icons/cashIcon.svg";
import arrowIcon from "../../assets/images/icons/arrowIcon.svg";
import styles from "./style.module.css";
import { useNavigate } from "react-router";
import Loader from "../Common/Loader";

interface IWallet {
  cashInHand: number;
  lastSettlementDate: string;
  totalSettlement: number;
  grandTotal: number;
  numberOfOrderAssigned: number;
  numberOfOrderDelivered: number;
  numberOfReturnOrderAssigned: number;
  numberOfReturnOrderDelivered: number;
}
interface Props {
  wallet?: IWallet;
}

const CashCount = ({ wallet }: Props) => {
  console.log("CASH COUNT = ", wallet);
  const navigate = useNavigate();
  return (
    <div
      className={styles.box}
      onClick={() => navigate("/settlements")}
    >
      {!wallet ? (
        <Loader />
      ) : (
        <>
          <div className={styles.box_contents}>
            <div className={styles.icon_div}>
              <img
                src={cashIcon}
                alt="icon"
              />
            </div>
            <div className={styles.content}>
              <h3>{wallet?.totalSettlement} OMR</h3>
              <p>Cash in Hand</p>
              <p>
                <span style={{ color: "red" }}>{wallet?.cashInHand} OMR </span> to Settle
              </p>
            </div>
          </div>
          <img
            src={arrowIcon}
            alt="icon"
          />
        </>
      )}
    </div>
  );
};

export default CashCount;
