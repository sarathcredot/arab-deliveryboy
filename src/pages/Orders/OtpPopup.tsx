import React, { useState } from "react";
import { Col, Input, Modal, ModalBody, Row } from "reactstrap";
import CustomButton from "src/components/Common/CustomButton";
import styles from "./style.module.css";

const OtpPopup = ({ isOpen, toggle }: any) => {
  const [otp, setOpt] = useState("");
  const submitOtp = async () => {
    console.log({ otp });
  };
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      centered={true}
    //   style={{ maxWidth: "90%", width: "400px", height: "400px", margin: "0px auto" }}
    >
      <ModalBody
        className="p-5"
        // style={{ maxWidth: "100%", maxHeight: "100%", height: "400px" }}
      >
        <h5>Please confirm the delivery by entering the OTP below.</h5>
        <div style={{
            display:"flex",
            alignItems:"center",
            gap:10,
            marginTop:20
        }}>

        <Input
          className={styles.input}
          type="text"
          placeholder="Enter the OTP here"
          value={otp}
          onChange={(e) => setOpt(e.target.value)}
        />
        <CustomButton
          name="Submit"
          padding="0 25px"
          onClick={submitOtp}
          />
          </div>
      </ModalBody>
    </Modal>
  );
};

export default OtpPopup;
