import React from "react";
import { Modal, ModalBody } from "reactstrap";
import CustomButton from "./Common/CustomButton";
import { useNavigate } from "react-router";

const LogoutPopup = ({ isOpen, toggle }: any) => {
    const navigate = useNavigate()
  const handleLogout = () => {
    navigate("/logout")
    localStorage.removeItem("agent_token");
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      centered={true}
      style={{
        maxWidth: "400px",
        padding: 10,
      }}
    >
      <ModalBody className="p-4 py-5 p-md-5">
        <h5
          style={{
            textAlign: "center",
          }}
        >
          Are you sure you want to log out?
        </h5>
        <CustomButton
          name="Logout"
          width="70%"
          bgColor="#E30613"
          className="m-auto mt-3"
          onClick={() => handleLogout()}
        />
      </ModalBody>
    </Modal>
  );
};

export default LogoutPopup;
