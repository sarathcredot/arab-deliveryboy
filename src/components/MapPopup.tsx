import React from "react";
import { Col, Modal, ModalBody, Row } from "reactstrap";



const MapPopup = ({ show,toggle }: any) => {
  return (
    <Modal
      isOpen={show}
      toggle={toggle}
      centered={true}
      style={{ maxWidth: "90%", width: "400px", height: "400px",margin:"0px auto" }}
    >
      <ModalBody
        className="p-0"
        style={{ maxWidth: "100%", maxHeight: "100%",height:"400px" }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250493.2690994958!2d75.7853358321803!3d11.190793017097807!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6367a09827289%3A0xa5bab8b1f3018ca4!2sManjeri%2C%20Kerala!5e0!3m2!1sen!2sin!4v1735275170950!5m2!1sen!2sin"
          
          
          style={{ border: 0,width:"100%",
            height:"100%" }}
          // allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </ModalBody>
    </Modal>
  );
};

export default MapPopup;
