import React, { useEffect, useState } from "react";
import { Col, Container, Input, Label, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useSearchParams } from "react-router-dom";
import styles from "./style.module.css";
import CustomButton from "src/components/Common/CustomButton";
import MapPopup from "src/components/MapPopup";
import { gql, useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import Loader from "src/components/Common/Loader";
// import OtpPopup from "./OtpPopup";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Returns", link: "/returns" },
  { title: "Return detail", link: "" },
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

const UPLOAD_IMAGES = gql`
  mutation UploadReturnProductImageByAgent($input: UploadReturnInput!, $image: Upload) {
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
  const [orderDetail, setOrderDetail] = useState<any>();
  const [returnStatus, setReturnStatus] = useState("");

  const [productImages, setProductImages] = useState<FileList | null>(null);
  const [uploadProductImages] = useMutation(UPLOAD_IMAGES);
  const [uploadLocation] = useMutation(UPLOAD_LOCATION);

  const {
    data: orderData,
    loading: orderDataLoading,
    error: orderDataError,
  } = useQuery(GET_ORDER_DETAIL, {
    variables: {
      input: {
        _id: "6762a8b43011832d35c2107f",
      },
    },
  });

  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("orderId");
  console.log({ orderId });
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
              orderProductId: "6762a8b43011832d35c2107f",
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

  const handleReturnStatus = (e: any) => {
    console.log("status =", e.target.value);
    setReturnStatus(e.target.value);
  };

  const handleImageUpload = async () => {
    if (productImages && productImages.length > 0) {
      console.log("IMAGES = ", productImages);
      try {
        const response = await uploadProductImages({
          variables: {
            input: {
              orderProductId: "6762a8b43011832d35c2107f",
            },
            image: productImages[0], // need to change this
          },
        });
        console.log("RESPONSE = ", response);
        if (response.data) {
          toast.success(response.data.uploadReturnProductImageByAgent.message);
        } else if (response.errors) {
          console.log("ERRORS = ", response.errors);
        }
      } catch (error: any) {
        console.log("error = ", error);
        toast.error(error);
      }
    } else {
      toast.error("Select Product Images");
    }
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
                              zIndex: "999",
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
                        onChange={handleReturnStatus}
                      >
                        <option
                          value=""
                          disabled
                        >
                          select
                        </option>
                        <option value={"Postponed to Tomorrow"}>Postponed to Tomorrow </option>
                        <option value={"Collected"}>Collected</option>
                        <option value={"Rejected"}>Rejected</option>
                        <option value={"Returned to Warehouse"}>Returned to Warehouse</option>
                      </Input>
                    </div>
                    <Input
                      className={styles.input}
                      type="text"
                      placeholder="Note"
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
      {/* <OtpPopup isOpen={openOtp} toggle={openOtpToggle} /> */}
    </React.Fragment>
  );
};

export default ReturnDetail;
