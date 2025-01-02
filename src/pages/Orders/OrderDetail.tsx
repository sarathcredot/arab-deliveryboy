import React, { useEffect, useState } from "react";
import { Col, Container, Input, Label, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import styles from "./style.module.css";
import CustomButton from "src/components/Common/CustomButton";
import MapPopup from "src/components/MapPopup";
import { gql, useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import Loader from "src/components/Common/Loader";
import OtpPopup from "./OtpPopup";
import { skip } from "node:test";
import OrderRemarkPopup from "./OrderRemarkPopup";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Orders", link: "/orders" },
  { title: "Order detail", link: "" },
];

const GET_ORDER_DETAIL = gql`
  query GetAssignedeOrderDeatilsByAgentProfile($input: getAssignedeOrderDeatilsByAgentProfileInput!) {
    getAssignedeOrderDeatilsByAgentProfile(input: $input) {
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
      returnStatus
      returnUserReason
      returnProductImage {
        fileType
        fileURL
        mimeType
        originalName
      }
      returnOrderAssignedOn
      returnAddress {
        firstname
        email
        mobile
        streetName
        city
        houseNumber
        country
        postCode
        apartment
        suite
        unit
      }
      returnAdminComment
      returnRequestDate
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

const DELIVERY_STATUS = gql`
  mutation OrderDelivedbyAgent($input: OrderDelivedbyAgentInput!) {
    orderDelivedbyAgent(input: $input) {
      status
      msg
      otp
    }
  }
`;

const OrderDetail = () => {
  const { id } = useParams();
  const [orderDetail, setOrderDetail] = useState<any>();
  const [deliveryStatus, setDeliveryStatus] = useState("");
  const [uploadLocation] = useMutation(UPLOAD_LOCATION);
  const [changeDeliveryStatus] = useMutation(DELIVERY_STATUS);
  const [remarks, setRemarks] = useState("");
  const [paymentMode, setPaymentMode] = useState("");

  const [invalid, setInvalid] = useState(false);
  const [linkInvalid, setLinkInvalid] = useState(false);

  const {
    data: orderData,
    loading: orderDataLoading,
    error: orderDataError,
    refetch,
  } = useQuery(GET_ORDER_DETAIL, {
    variables: {
      input: {
        _id: id,
      },
      skip: !id,
    },
  });

  console.log({ id });
  const [trackingLink, setTrackingLink] = useState("");

  const [openOtp, setOpenOtp] = useState(false);
  const openOtpToggle = () => {
    setOpenOtp(!openOtp);
    refetch();
    resetDeliveryStatus();
  };
  const [openRemarks, setOpenRemarks] = useState(false);
  const openRemarksToggle = () => {
    if (!remarks) {
      setOpenRemarks(!openRemarks);
      resetDeliveryStatus();
    }
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
    // toast.error(orderDataError.message);
  }
  console.log("DATA = ", orderData);

  const submitTrackingLink = async () => {
    console.log({ trackingLink });
    if (!trackingLink) {
      return setLinkInvalid(true);
    }
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
        setTimeout(() => {
          window.open(trackingLink, "_blank");
        }, 1000);
        // setShowMap(true);
      } else if (response.errors) {
        console.log("ERRORS = ", response.errors);
      }
    } catch (error: any) {
      console.log("ERROR = ", error);
      toast.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!paymentMode) {
      return toast.error("Select a Payment Method");
    }
    if (!deliveryStatus) {
      return toast.error("Select a Status");
    }
    if (!remarks) {
      return setInvalid(true);
    }

    try {
      const response = await changeDeliveryStatus({
        variables: {
          input: {
            orderItemId: id,
            deliveryStatus,
            remarks,
          },
        },
      });

      if (response.data.orderDelivedbyAgent.status) {
        setOpenRemarks(false);
        if (response.data.orderDelivedbyAgent.otp) {
          setOpenOtp(true);
        } else {
          refetch();
          toast.success(response.data.orderDelivedbyAgent.msg);
        }
      } else {
        return toast.error(response.data.orderDelivedbyAgent.msg);
      }
    } catch (error: any) {
      console.log("ERROR = ", error);
      return toast.error(error);
    }
  };
  const resetDeliveryStatus = () => {
    if (
      orderDetail.shippingStatus === "POSTPONED" ||
      orderDetail.shippingStatus === "DELIVERED" ||
      orderDetail.shippingStatus === "CANCELED"
    ) {
      setDeliveryStatus(orderDetail?.shippingStatus);
    } else {
      setDeliveryStatus("");
    }
  };
  useEffect(() => {
    if (orderDetail) {
      resetDeliveryStatus();
      setPaymentMode(orderDetail?.paymentMode);
    }
  }, [orderDetail, orderData, refetch]);
  console.log("STATUS = ", deliveryStatus);
  return (
    <React.Fragment>
      <div className="page-content mb-5 mb-md-0 ">
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
                        <p>Date :</p>{" "}
                        <p>
                          {orderDetail?.orderDate &&
                            new Date(orderDetail.orderDate).toLocaleDateString("en-GB").replace(/\//g, "-")}
                        </p>
                      </div>
                      <div>
                        <p>Contact :</p> <p>{orderDetail?.mobileNumber && `+956 ${orderDetail.mobileNumber}`}</p>
                      </div>
                      <div>
                        <p>payment Type :</p>{" "}
                        <p>
                          {orderDetail?.paymentMode === "COD"
                            ? "Cash On Delivery"
                            : orderDetail?.paymentMode === "CARD"
                            ? "Card On Delivery"
                            : orderDetail?.paymentMode}
                        </p>
                      </div>
                      <div>
                        <p>payable :</p> <p>{orderDetail?.sellingPrice && `${orderDetail?.sellingPrice} OMR`}</p>
                      </div>
                      <div>
                        <p>Address :</p>{" "}
                        <p>
                          {[
                            orderDetail?.houseNumber,
                            orderDetail?.apartment,
                            orderDetail?.streetName,
                            orderDetail?.city,
                            orderDetail?.postCode,
                          ]
                            .filter(Boolean)
                            .join(", ")}
                        </p>
                      </div>
                      <div>
                        <p>Status :</p>
                        <p
                          style={{
                            color: "#F97316",
                          }}
                        >
                          {orderDetail?.shippingStatus}
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
                      invalid={linkInvalid}
                      onChange={(e) => {
                        setLinkInvalid(false);
                        setTrackingLink(e.target.value);
                      }}
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
              <div
                style={{
                  border: "1px solid #DDDDDD",
                  borderRadius: "10px",
                }}
              >
                <div className={styles.box}>
                  {orderDataLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <div>
                        <Label className="form-label ">Payment Method</Label>
                        <Input
                          name="paymentMode"
                          placeholder="Select Payment Method"
                          type="select"
                          value={paymentMode}
                          className={styles.select_box}
                          onChange={(e) => setPaymentMode(e.target.value)}
                        >
                          <option
                            value=""
                            disabled
                          >
                            Select Payment Method
                          </option>
                          <option value={"COD"}>Cash On Delivery</option>
                          <option value={"CARD"}>Card on Delivery</option>
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
                          onChange={(e) => {
                            setDeliveryStatus(e.target.value);
                            setOpenRemarks(true);
                          }}
                        >
                          <option
                            value=""
                            disabled
                          >
                            Select Delivery Status
                          </option>
                          <option value={"POSTPONED"}>POSTPONED</option>
                          <option value={"DELIVERED"}>DELIVERED</option>
                          <option value={"CANCELED"}>CANCELED</option>
                        </Input>
                      </div>
                    </>
                  )}
                </div>
                <div
                  className="d-none d-md-flex"
                  style={{
                    display: "flex",
                    padding: "34px 20px",
                    gap: 15,
                  }}
                >
                  <a
                    href={`tel:+956${orderDetail?.mobileNumber}`}
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#28A745",
                      color: "white",
                      width: "100%",
                      height: "40px",
                      borderRadius: "10px",
                      gap: "5px",
                      fontSize: "13px",
                      border: "none",
                    }}
                  >
                    Call Customer
                  </a>
                  <CustomButton
                    name="Closed"
                    width="100%"
                    // onClick={() => refetch()}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={`${styles.call_box} d-md-none`}>
        <a
          href={`tel:+956${orderDetail?.mobileNumber}`}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#28A745",
            color: "white",
            width: "100%",
            height: "40px",
            borderRadius: "10px",
            gap: "5px",
            fontSize: "13px",
            border: "none",
          }}
        >
          Call Customer
        </a>
        {/* <CustomButton
          name="Closed"
          width="100%"
          // onClick={handleSubmit}
        /> */}
      </div>
      <OrderRemarkPopup
        remarks={remarks}
        setRemarks={setRemarks}
        submit={handleSubmit}
        isOpen={openRemarks}
        toggle={openRemarksToggle}
        refetch={refetch}
      />
      <OtpPopup
        isOpen={openOtp}
        setOpenOtp={setOpenOtp}
        toggle={openOtpToggle}
        orderItemId={id}
        deliveryStatus={deliveryStatus}
        paymentMode={paymentMode}
        remarks={remarks}
        refetch={refetch}
      />
    </React.Fragment>
  );
};

export default OrderDetail;
