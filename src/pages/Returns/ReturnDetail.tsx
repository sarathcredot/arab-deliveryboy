import React, { useEffect, useState } from "react";
import { Col, Container, FormFeedback, Input, Label, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useParams, useSearchParams } from "react-router-dom";
import styles from "./style.module.css";
import CustomButton from "src/components/Common/CustomButton";
import MapPopup from "src/components/MapPopup";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Slide, toast, ToastContainer } from "react-toastify";
import Loader from "src/components/Common/Loader";
import OtpPopup from "../Orders/OtpPopup";
import ReturnRemarkPopup from "./ReturnRemarkPopup";
// import OtpPopup from "./OtpPopup";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Returns", link: "/returns" },
  { title: "Return detail", link: "" },
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

const RETURN_STATUS = gql`
  mutation ReturnStatusChangeDeliveryAgent($input: ReturnstatusUpdateInput!) {
    returnStatusChangeDeliveryAgent(input: $input) {
      otp
      status
      msg
    }
  }
`;

const UPLOAD_IMAGES = gql`
  mutation UploadReturnProductImageByAgent($input: UploadReturnInput!, $image: [Upload]) {
    uploadReturnProductImageByAgent(input: $input, image: $image) {
      message
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

const ReturnDetail = () => {
  const { id } = useParams();
  const [orderDetail, setOrderDetail] = useState<any>();
  const [returnStatus, setReturnStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  const [invalid, setInvalid] = useState(false);
  const [linkInvalid, setLinkInvalid] = useState(false);

  const [productImages, setProductImages] = useState<FileList | null>(null);
  const [uploadProductImages] = useMutation(UPLOAD_IMAGES);
  const [uploadLocation] = useMutation(UPLOAD_LOCATION);
  const [changeReturnStatus] = useMutation(RETURN_STATUS);

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
    fetchPolicy: "network-only",
  });

  const [trackingLink, setTrackingLink] = useState("");

  const [openOtp, setOpenOtp] = useState(false);
  const openOtpToggle = () => {
    setOpenOtp(!openOtp);
    resetReturnStatus();
  };
  const [openRemarks, setOpenRemarks] = useState(false);
  const openRemarksToggle = () => {
    if (!remarks) {
      setOpenRemarks(!openRemarks);
      resetReturnStatus();
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
  }, [orderData, refetch]);

  if (orderDataError) {
    // console.log("ERROR =   ", orderDataError);
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
        toast(response.data.updateDeliveredMapLocation.message, {
          position: "top-right",
          hideProgressBar: true,
          className: "bg-success text-white",
          transition: Slide,
          autoClose: 2000,
          closeOnClick: true,
        });
        refetch();
        setShowMap(true);
      } else if (response.errors) {
        console.log("ERRORS = ", response.errors);
      }
    } catch (error: any) {
      console.log("ERROR = ", error);
      toast(error, {
        position: "top-right",
        hideProgressBar: true,
        className: "bg-danger text-white",
        transition: Slide,
        autoClose: 2000,
        closeOnClick: true,
      });
    }
  };

  // submit return status
  const handleReturnStatus = async () => {
    if (!returnStatus) {
      return toast("select return status", {
        position: "top-right",
        hideProgressBar: true,
        className: "bg-danger text-white",
        transition: Slide,
        autoClose: 2000,
        closeOnClick: true,
      });
    }
    if (!remarks) {
      return setInvalid(true);
    }

    try {
      const response = await changeReturnStatus({
        variables: {
          input: {
            orderProductId: id,
            returnStatus,
            remarks,
          },
        },
      });

      if (response.data.returnStatusChangeDeliveryAgent.status) {
        setOpenRemarks(false);
        if (response.data.returnStatusChangeDeliveryAgent.otp) {
          setOpenOtp(true);
        } else {
          toast(response.data.returnStatusChangeDeliveryAgent.msg, {
            position: "top-right",
            hideProgressBar: true,
            className: "bg-success text-white",
            transition: Slide,
            autoClose: 2000,
            closeOnClick: true,
          });
          refetch();
        }
      } else {
        return toast(response.data.returnStatusChangeDeliveryAgent.msg, {
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
      toast(error.message, {
        position: "top-right",
        hideProgressBar: true,
        className: "bg-danger text-white",
        transition: Slide,
        autoClose: 2000,
        closeOnClick: true,
      });
    }
  };

  const handleImageUpload = async () => {
    console.log("IMAGES = ", productImages);
    if (productImages && productImages.length > 0) {
      console.log("IMAGES = ", productImages);
      try {
        const response = await uploadProductImages({
          variables: {
            input: {
              orderProductId: id,
            },
            image: productImages, // need to change this
          },
        });
        console.log("RESPONSE = ", response);
        if (response?.data) {
          toast(response?.data?.uploadReturnProductImageByAgent?.message, {
            position: "top-right",
            hideProgressBar: true,
            className: "bg-success text-white",
            transition: Slide,
            autoClose: 2000,
            closeOnClick: true,
          });
        } else if (response?.errors) {
          console.log("ERRORS = ", response.errors);
        }
      } catch (error: any) {
        console.log("error = ", error);
        toast(error, {
          position: "top-right",
          hideProgressBar: true,
          className: "bg-danger text-white",
          transition: Slide,
          autoClose: 2000,
          closeOnClick: true,
        });
      }
    } else {
      toast("Select Product Images", {
        position: "top-right",
        hideProgressBar: true,
        className: "bg-success text-white",
        transition: Slide,
        autoClose: 2000,
        closeOnClick: true,
      });
    }
  };
  const resetReturnStatus = () => {
    if (
      orderDetail?.returnStatus === "POSTPONED" ||
      orderDetail?.returnStatus === "COLLECTED" ||
      orderDetail?.returnStatus === "REJECTED" ||
      orderDetail?.returnStatus === "RETURNED TO WAREHOUSE"
    ) {
      setReturnStatus(orderDetail?.returnStatus);
    } else {
      setReturnStatus("");
    }
  };

  useEffect(() => {
    if (orderDetail) {
      resetReturnStatus();
    }
  }, [orderDetail, orderData, refetch]);
  return (
    <React.Fragment>
      <div className="page-content mb-5 mb-md-0">
        <Container
          fluid
          className="px-2"
        >
          {/* Render Breadcrumbs */}
          <Breadcrumbs breadcrumbs={breadcrumbItems} />
          <Row
            style={{
              padding: "0 5px",
            }}
          >
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
                        <p>Customer :</p> <p className="text-capitalize">{orderDetail?.userName}</p>
                      </div>
                      <div>
                        <p>Date :</p>{" "}
                        <p>
                          {orderDetail?.returnOrderAssignedOn &&
                            new Date(orderDetail?.returnOrderAssignedOn)
                              .toLocaleDateString("en-GB")
                              .replace(/\//g, "-")}
                        </p>
                      </div>
                      <div>
                        <p>Contact :</p> <p>+956 {orderDetail?.mobileNumber}</p>
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
                        <p>payable :</p> <p>{orderDetail?.sellingPrice} OMR</p>
                      </div>
                      <div>
                        <p>Address :</p>{" "}
                        <p className="text-capitalize">
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
                          className="text-capitalize"
                          style={{
                            color:
                              orderDetail?.returnStatus === "APPROVED"
                                ? "#F97316"
                                : orderDetail?.returnStatus === "POSTPONED"
                                ? "#5a6f05"
                                : orderDetail?.returnStatus === "COLLECTED"
                                ? "#4947D0"
                                : orderDetail?.returnStatus === "RETURNED TO WAREHOUSE"
                                ? "#005E2B"
                                : orderDetail?.returnStatus === "REJECTED"
                                ? "#E30613"
                                : "#000",
                            textTransform: "uppercase",
                          }}
                        >
                          {orderDetail?.returnStatus === "APPROVED"
                            ? "Return Requested"
                            : orderDetail?.returnStatus === "POSTPONED"
                            ? "Postponed to Tomorrow"
                            : orderDetail?.returnStatus.toLowerCase()}
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
                        <Label className="form-label ">Upload Product Images</Label>
                        <div
                          style={{
                            position: "relative",
                          }}
                        >
                          <Input
                            name="projectImages"
                            //   placeholder="Select Payment Method"
                            type="file"
                            multiple
                            className={styles.select_box}
                            onChange={(e) => setProductImages(e.target.files)}
                            style={{
                              // width: "100px",
                              position: "absolute",
                              top: 0,
                              left: 0,
                              opacity: 0,
                            }}
                          />
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              border: "1px solid #CDCDCD",
                              borderRadius: "5px",
                              paddingLeft: "10px",
                            }}
                          >
                            {productImages && productImages.length > 0 ? (
                              <p
                                style={{
                                  width: "100%",
                                  color: "#000",
                                }}
                              >
                                {productImages.length} Product Images Selected
                              </p>
                            ) : (
                              <p
                                style={{
                                  width: "100%",
                                  color: "#C5C5C5",
                                }}
                              >
                                Upload Product Images
                              </p>
                            )}
                            <CustomButton
                              bgColor="#000"
                              name="Upload"
                              width="120px"
                              onClick={handleImageUpload}
                              style={{
                                zIndex: "998",
                                background: "black",
                                width: "120px",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <Label className="form-label ">Return Status </Label>

                        <Input
                          name="returnStatus"
                          placeholder="Select"
                          type="select"
                          className={styles.select_box}
                          value={returnStatus}
                          onChange={(e) => {
                            setReturnStatus(e.target.value);
                            setOpenRemarks(true);
                          }}
                        >
                          <option
                            value=""
                            disabled
                          >
                            select
                          </option>
                          <option value={"POSTPONED"}>Postponed to Tomorrow </option>
                          <option value={"COLLECTED"}>Collected</option>
                          <option value={"REJECTED"}>Rejected</option>
                          <option value={"RETURNED TO WAREHOUSE"}>Returned to Warehouse</option>
                        </Input>
                      </div>
                      {/* <Input
                        className={styles.input}
                        type="text"
                        placeholder="Note"
                        invalid={invalid}
                        onChange={(e) => {
                          setInvalid(false);
                          setRemarks(e.target.value);
                        }}
                      /> */}
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
                    href="tel:+919744712490"
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
                    // onClick={handleReturnStatus}
                  /> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={`${styles.call_box} d-md-none`}>
        <a
          href="tel:+919744712490"
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
          // onClick={handleReturnStatus}
        /> */}
      </div>
      <ReturnRemarkPopup
        remarks={remarks}
        setRemarks={setRemarks}
        submit={handleReturnStatus}
        isOpen={openRemarks}
        toggle={openRemarksToggle}
      />
      <OtpPopup
        isOpen={openOtp}
        setOpenOtp={setOpenOtp}
        toggle={openOtpToggle}
        orderItemId={id}
        returnStatus={returnStatus}
        returnRemark={remarks}
        refetch={refetch}
      />
      <ToastContainer/>
    </React.Fragment>
  );
};

export default ReturnDetail;
