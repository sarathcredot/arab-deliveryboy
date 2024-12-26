import React from "react";
import { Col, Container, Input, Label, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useSearchParams } from "react-router-dom";
import styles from "./style.module.css";
import CustomButton from "src/components/Common/CustomButton";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Orders", link: "/orders" },
  { title: "Order detail", link: "" },
];

const OrderDetail = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  console.log({ orderId });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs breadcrumbs={breadcrumbItems} />
          <Row>
            <Col
              style={{ padding: "4px" }}
              lg={6}
              md={6}
            >
              <div className={styles.detail_box}>
                <div className={styles.detail_content}>
                  <div>
                    <p>Order ID :</p> <p>1733293438730</p>
                  </div>
                  <div>
                    <p>Customer :</p> <p>Alexis Sanchez</p>
                  </div>
                  <div>
                    <p>Date :</p> <p>22/10/2024</p>
                  </div>
                  <div>
                    <p>Contact :</p> <p>+956 8089 660 897</p>
                  </div>
                  <div>
                    <p>payment Type :</p> <p>Cash/Card OD</p>
                  </div>
                  <div>
                    <p>payable :</p> <p>256 OMR</p>
                  </div>
                  <div>
                    <p>Address :</p> <p>256 Al Jabal Al Akhdar, Nizwa, Oman, 621</p>
                  </div>
                  <div>
                    <p>Status :</p>
                    <p
                      style={{
                        color: "#F97316",
                      }}
                    >
                      Out for Delivery
                    </p>
                  </div>
                </div>
                <div
                  style={{
                    borderTop: "1px solid #DDDDDD",
                    padding: 20,
                  }}
                >
                  <h5
                    style={{
                      fontSize: "16px",
                      marginBottom: 10,
                    }}
                  >
                    Track Location
                  </h5>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                  >
                    <Input
                      className={styles.input}
                      type="text"
                      placeholder="Past the tracking link here"
                    />
                    <CustomButton
                      name="Save"
                      padding="0 25px"
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col
              style={{ padding: "4px" }}
              lg={6}
              md={6}
            >
              <div className={styles.box}>
                <div>
                  <Label className="form-label ">Payment Method</Label>
                  <Input
                    name="paymentMethod"
                    placeholder="Select Payment Method"
                    type="select"
                    // value={formik.values?.agentType}
                    className={styles.select_box}
                  >
                    <option
                      value=""
                      disabled
                    >
                      Select Payment Method
                    </option>
                    <option value={"CASH ON DELIVERY"}>Cash On Delivery</option>
                    <option value={"CARD ON DELIVERY"}>Card on Delivery</option>
                  </Input>
                </div>
                <div>
                  <Label className="form-label ">Delivery Status </Label>
        
                  <Input
                    name="deliveryStatus"
                    placeholder="Select Delivery Status"
                    type="select"
                    className={styles.select_box}

                    // value={formik.values?.agentType}
                  >
                    <option
                      value=""
                      disabled
                    >
                      Select Delivery Status
                    </option>
                    <option value={"Postponed"}>Postponed</option>
                    <option value={"Delivered"}>Delivered</option>
                    <option value={"Cancelled"}>Cancelled</option>
                  </Input>
                </div>
                <Input
                  className={styles.input}
                  type="text"
                  placeholder="Note "
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={`${styles.call_box} d-md-none`}>
        <CustomButton
          bgColor="#28A745"
          name="Call Customer"
          width="100%"
        />
        <CustomButton
          name="Closed"
          width="100%"
        />
      </div>
    </React.Fragment>
  );
};

export default OrderDetail;
