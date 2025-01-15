import React from "react";
import { Modal, ModalBody } from "reactstrap";
import CustomButton from "./Common/CustomButton";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

const LogoutPopup = ({ isOpen, toggle }: any) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
    localStorage.removeItem("agent_token");
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      centered={true}
      style={{
        maxWidth: "400px",
        padding: 20,
      }}
    >
      <ModalBody
        style={{
          padding: "30px",
        }}
      >
        <h5
          style={
            {
              // textAlign: "center",
            }
          }
        >
          Are you sure you want to log out?
        </h5>
        <div className=" d-flex justify-content-end gap-2">
          <CustomButton
            name="Cancel"
            color="#E30613"
            bgColor="#fff"
            width="30%"
            className=" mt-3"
            padding="5px"
            onClick={() => toggle()}
          />
          <CustomButton
            name="Logout"
            bgColor="#E30613"
            width="30%"
            className=" mt-3"
            onClick={() => handleLogout()}
          />
        </div>
      </ModalBody>
    </Modal>
  );
};

export default LogoutPopup;
