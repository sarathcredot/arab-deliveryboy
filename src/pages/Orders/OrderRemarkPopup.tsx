import React, { useState } from "react";
import { Col, Form, Input, Modal, ModalBody, Row } from "reactstrap";
import CustomButton from "src/components/Common/CustomButton";
import styles from "./style.module.css";
import { gql, useMutation } from "@apollo/client";
import { toast } from "react-toastify";

const OrderRemarkPopup = ({ remarks, setRemarks, submit, isOpen, toggle }: any) => {
  const [invaild, setInvalid] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      centered={true}
    >
      <ModalBody className="p-4 py-5 p-md-5">
        <h5>Please enter remarks for the delivery status change.</h5>
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
              if (remarks) {
                submit();
              } else {
                setInvalid(true);
              }
            }}
            style={{
              width: "100%",
            }}
          >
            <Input
              className={styles.input}
              invalid={invaild}
              type="text"
              placeholder="Enter Remarks here"
              value={remarks}
              onChange={(e) => {
                setInvalid(false);
                setRemarks(e.target.value);
              }}
            />
          </Form>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default OrderRemarkPopup;
