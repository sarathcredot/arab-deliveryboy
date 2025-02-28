import React, { useState } from "react";
import { Col, Form, Input, Modal, ModalBody, Row } from "reactstrap";
import CustomButton from "src/components/Common/CustomButton";
import styles from "src/pages/Returns/style.module.css";
import { gql, useMutation } from "@apollo/client";
import { Slide, toast } from "react-toastify";

const VERIFY_OTP = gql`
  mutation ClaimOtpVerification($input: claimOtpVerificationInput!) {
    claimOtpVerification(input: $input) {
      status
      msg
    }
  }
`;

const WarrantyOtpPopup = ({
  claimRequestId,
  claimStatus,
  remarks,
  isOpen,
  setOpenOtp,
  toggle,
  refetch,
}: any) => {
  const [verifyOtp] = useMutation(VERIFY_OTP);
  const [invaild, setInvalid] = useState(false);
  const [otp, setOpt] = useState("");
  const submitOtp = async () => {
    console.log({ otp });
    if (!claimRequestId) {
      return toast("Pickup ID is Required", {
        position: "top-right",
        hideProgressBar: true,
        className: "bg-danger text-white",
        transition: Slide,
        autoClose: 2000,
        closeOnClick: true,
      });
    }
    if (!otp) {
      return setInvalid(true);
    }

    try {
      const response = await verifyOtp({
        variables: {
          input: {
            claimRequestId:claimRequestId,
            claimStatus:claimStatus,
            remarks,
            code: otp,
          },
        },
      });
      console.log("RESPONSE = ", response);
      if (response.data.claimOtpVerification.status) {
        toast(response.data.claimOtpVerification.msg, {
          position: "top-right",
          hideProgressBar: true,
          className: "bg-success text-white",
          transition: Slide,
          autoClose: 2000,
          closeOnClick: true,
        });
        refetch();
        setOpenOtp(false);
      } else if (response.data.claimOtpVerification.msg) {
        toast(response.data.claimOtpVerification.msg, {
          position: "top-right",
          hideProgressBar: true,
          className: "bg-danger text-white",
          transition: Slide,
          autoClose: 2000,
          closeOnClick: true,
        });
      }
    } catch (error: any) {
      console.log("ERROR = ", error);

      toast(error?.message, {
        position: "top-right",
        hideProgressBar: true,
        className: "bg-danger text-white",
        transition: Slide,
        autoClose: 2000,
        closeOnClick: true,
      });
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      toggle={() => {
        if (!otp) {
          toggle();
        }
      }}
      centered={true}
      style={{
        padding: 10,
      }}
    >
      <ModalBody className="p-4 py-5 p-md-5">
        <h5>Please confirm the delivery by entering the OTP below.</h5>
        <div
          className="flex-column flex-md-row"
          style={{
            display: "flex",
            gap: 15,
            marginTop: 20,
          }}
        >
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              submitOtp();
            }}
            style={{
              width: "100%",
            }}
          >
            <Input
              className={styles.input}
              invalid={invaild}
              type="text"
              placeholder="Enter the OTP here"
              value={otp}
              onChange={(e) => {
                setInvalid(false);
                setOpt(e.target.value);
              }}
            />
          </Form>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default WarrantyOtpPopup;
