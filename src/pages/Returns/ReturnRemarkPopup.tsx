import React, { useState } from "react";
import { Col, Input, Modal, ModalBody, Row } from "reactstrap";
import CustomButton from "src/components/Common/CustomButton";
import styles from "./style.module.css";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const ReturnRemarkPopup = ({ remarks, setRemarks, submit, isOpen, toggle }: any) => {
  const [invaild, setInvalid] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      centered={true}
    >
      <ModalBody className="p-4 p-md-5">
        <h5>Please enter remarks for the return status change.</h5>
        <div
          className="flex-column flex-md-row"
          style={{
            display: "flex",
            gap: 15,
            marginTop: 20,
          }}
        >
          <Input
            className={styles.input}
            invalid={invaild}
            type="text"
            placeholder="Enter Remarks here"
            value={remarks}
            // onKeyUp={}
            onChange={(e) => {
              setInvalid(false);
              setRemarks(e.target.value);
            }}
          />
          <CustomButton
            name="Submit"
            padding="0 25px"
            width="100px"
            className="ms-auto"
            onClick={() => {
              if (remarks) {
                submit();
              } else {
                setInvalid(true);
              }
            }}
          />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ReturnRemarkPopup;
