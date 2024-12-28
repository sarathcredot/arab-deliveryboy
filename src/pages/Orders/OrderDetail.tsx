import React, { useEffect, useState } from "react";
import { Col, Container, Input, Label, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useParams, useSearchParams } from "react-router-dom";
import styles from "./style.module.css";
import CustomButton from "src/components/Common/CustomButton";
import MapPopup from "src/components/MapPopup";
import { gql, useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import Loader from "src/components/Common/Loader";
import OtpPopup from "./OtpPopup";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Orders", link: "/orders" },
  { title: "Order detail", link: "" },
];

const GET_ORDER_DETAIL = gql`
  query GetAssignedeOrderDeatilsByAgentProfile($input: getAssignedeOrderDeatilsByAgentProfileInput!) {
    getAssignedeOrderDeatilsByAgentProfile(input: $input) {
      records {
        _id
        orderId
        userId
        productName
        itemId
        sellingPrice
        paymentStatus
        paymentMode
        orderDate
        shippingStatus
        deliveryAgentId
        userName
        email
        mobileNumber
        houseNumber
        streetName
        apartment
        suite
        unit
        city
        country
        postCode
      }
      maxRecords
    }
  }
`;
const UPLOAD_LOCATION = gql`
  mutation UpdateDeliveredMapLocation($input: UpdateMapLocation!) {
    updateDeliveredMapLocation(input: $input) {
      message
    }
  }
`;

const OrderDetail = () => {
  const { id } = useParams();
  const [orderDetail, setOrderDetail] = useState<any>();
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [uploadLocation] = useMutation(UPLOAD_LOCATION);

  const {
    data: orderData,
    loading: orderDataLoading,
    error: orderDataError,
  } = useQuery(GET_ORDER_DETAIL, {
    variables: {
      input: {
        _id: id,
      },
    },
  });

  console.log({ id });
  const [trackingLink, setTrackingLink] = useState("");

  const [openOtp, setOpenOtp] = useState(false);
  const openOtpToggle = () => {
    setOpenOtp(!openOtp);
  };
  const [showMap, setShowMap] = useState(false);
  const mapToggle = () => {
    setShowMap(!showMap);
  };

  useEffect(() => {
    if (orderData && orderData.getAssignedeOrderDeatilsByAgentProfile) {
      setOrderDetail(orderData.getAssignedeOrderDeatilsByAgentProfile);
    }
  }, [orderData]);

  if (orderDataError) {
    console.log("ERROR =   ", orderDataError);
    toast.error(orderDataError.message);
  }
  console.log("DATA = ", orderData);

  const submitTrackingLink = async () => {
    console.log({ trackingLink });

    if (trackingLink) {
      try {
        const response = await uploadLocation({
          variables: {
            input: {
              orderProductId: id,
              mapLocation: trackingLink,
            },
          },
        });

        if (response.data) {
          toast.success(response.data.updateDeliveredMapLocation.message);
          setShowMap(true);
        } else if (response.errors) {
          console.log("ERRORS = ", response.errors);
        }
      } catch (error: any) {
        console.log("ERROR = ", error);
        toast.error(error);
      }
    }
  };

  const handleDeliveryStatus = (e: any) => {
    console.log("status =", e.target.value);
    setDeliveryStatus(e.target.value);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs breadcrumbs={breadcrumbItems} />
          <Row>
            <Col
              style={{ padding: "8px" }}
              lg={6}
              md={6}
            >
              <div className={styles.detail_box}>
                <div className={styles.detail_content}>
                  {orderDataLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <div>
                        <p>Order ID :</p> <p>{orderDetail?.orderId}</p>
                      </div>
                      <div>
                        <p>Customer :</p> <p>{orderDetail?.userName}</p>
                      </div>
                      <div>
                        <p>Date :</p> <p>{orderDetail?.orderDate}</p>
                      </div>
                      <div>
                        <p>Contact :</p> <p>+956 {orderDetail?.mobileNumber}</p>
                      </div>
                      <div>
                        <p>payment Type :</p> <p>{orderDetail?.paymentMod}</p>
                      </div>
                      <div>
                        <p>payable :</p> <p>{orderDetail?.sellingPrice} OMR</p>
                      </div>
                      <div>
                        <p>Address :</p>{" "}
                        <p>
                          {orderDetail?.houseNumber}, {orderDetail?.apartment}, {orderDetail?.streetName},{" "}
                          {orderDetail?.city}, {orderDetail?.postCode}
                        </p>
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
                    </>
                  )}
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
                      value={trackingLink}
                      onChange={(e) => setTrackingLink(e.target.value)}
                    />
                    <CustomButton
                      name="Save"
                      padding="0 25px"
                      onClick={submitTrackingLink}
                    />

                    <MapPopup
                      show={showMap}
                      toggle={mapToggle}
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col
              style={{ padding: "8px" }}
              lg={6}
              md={6}
            >
              <div className={styles.box}>
                {orderDataLoading ? (
                  <Loader />
                ) : (
                  <>
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
                        value={deliveryStatus}
                        onChange={handleDeliveryStatus}
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
                  </>
                )}
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
      <OtpPopup
        isOpen={openOtp}
        toggle={openOtpToggle}
      />
    </React.Fragment>
  );
};

export default OrderDetail;
