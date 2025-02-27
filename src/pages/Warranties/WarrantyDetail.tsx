import React, { useEffect, useState } from "react";
import { Col, Container, FormFeedback, Input, Label, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useParams, useSearchParams } from "react-router-dom";
import styles from "src/pages/Returns/style.module.css";
import CustomButton from "src/components/Common/CustomButton";
import MapPopup from "src/components/MapPopup";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Slide, toast, ToastContainer } from "react-toastify";
import Loader from "src/components/Common/Loader";
import OtpPopup from "../Orders/OtpPopup";
import ReturnRemarkPopup from "../Returns/ReturnRemarkPopup";
import WarrantyOtpPopup from "./WarrantyOtpPopup";
import WarrantyRemarkPopup from "./WarrantyRemarkPopup";
// import ReturnRemarkPopup from "./ReturnRemarkPopup";
// import OtpPopup from "./OtpPopup";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Warranty Pickups", link: "/warranty-pickups" },
  { title: "Pickup detail", link: "" },
];

const GET_ORDER_DETAIL = gql`
  query GetDetailsOfWarrantyPickupsByAgent($input: getDetailsOfWarrantyPickupsByAgentInput!) {
    getDetailsOfWarrantyPickupsByAgent(input: $input) {
      product {
        productId
        warranty {
          name
          description
          duration
          warrantyType
        }
        productName
        deliveryDate
        shippingStatus
        orderDate
        paymentStatus
        shippingCharge
        sellingPrice
        paymentMode
        itemId
      }
      _id
      productImage {
        fileType
        fileURL
        mimeType
        originalName
      }
      createdAt
      issueDescription
      warrantyId
      claimStatus
      claimType
      claimDate
      warrantyAddress {
        firstname
        email
        mobile
        country
        postCode
        governorate
        village
        governorateID
        villageID
        address
      }
      replacementDeliveredLocation
      deliveryAgentAssignedOn
    }
  }
`;

const WARRANTY_STATUS = gql`
  mutation UpdateClaimStatusByAgent($input: updateClaimStatusByAgentInput!) {
    updateClaimStatusByAgent(input: $input) {
      status
      otp
      msg
    }
  }
`;

const UPLOAD_IMAGES = gql`
  mutation UploadWarrantyProductImageByAgent($input: uploadWarrantyProductImageByAgentInput!, $image: [Upload]) {
    uploadWarrantyProductImageByAgent(input: $input, image: $image) {
      message
    }
  }
`;
const UPLOAD_LOCATION = gql`
  mutation UpdateReplacementDeliveredLocation($input: updateReplacementDeliveredLocationInput!) {
    updateReplacementDeliveredLocation(input: $input) {
      message
    }
  }
`;

const WarrantyDetail = () => {
  const { id } = useParams();
  const [warrantyDetail, setWarrantyDetail] = useState<any>();
  const [claimStatus, setClaimStatus] = useState("");
  const [remarks, setRemarks] = useState("");

  const [invalid, setInvalid] = useState(false);
  const [linkInvalid, setLinkInvalid] = useState(false);

  const [productImages, setProductImages] = useState<FileList | null>(null);
  const [uploadProductImages] = useMutation(UPLOAD_IMAGES);
  const [uploadLocation] = useMutation(UPLOAD_LOCATION);
  const [changeWarrantyStatus] = useMutation(WARRANTY_STATUS);

  const {
    data: orderData,
    loading: orderDataLoading,
    error: orderDataError,
    refetch,
  } = useQuery(GET_ORDER_DETAIL, {
    variables: {
      input: {
        claimRequestId: id,
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
    if (orderData && orderData.getDetailsOfWarrantyPickupsByAgent) {
      setWarrantyDetail(orderData.getDetailsOfWarrantyPickupsByAgent);
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
            claimRequestId: id,
            mapLocation: trackingLink,
          },
        },
      });

      if (response.data) {
        toast(response.data.updateReplacementDeliveredLocation.message, {
          position: "top-right",
          hideProgressBar: true,
          className: "bg-success text-white",
          transition: Slide,
          autoClose: 2000,
          closeOnClick: true,
        });
        refetch();
        setTimeout(() => {
          window.open(trackingLink, "_blank");
        }, 1000);
        // setShowMap(true);
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

  // submit warranty status
  const handleWarrantyStatus = async (status: any) => {
    if (!status && !claimStatus) {
      return toast("select warranty status", {
        position: "top-right",
        hideProgressBar: true,
        className: "bg-danger text-white",
        transition: Slide,
        autoClose: 2000,
        closeOnClick: true,
      });
    }
    if (!status && !remarks) {
      return setInvalid(true);
    }

    try {
      const response = await changeWarrantyStatus({
        variables: {
          input: {
            claimRequestId: id,
            claimStatus: status ?? claimStatus,
            remarks,
          },
        },
      });

      if (response.data.updateClaimStatusByAgent.status) {
        setOpenRemarks(false);
        if (response.data.updateClaimStatusByAgent.otp) {
          setOpenOtp(true);
        } else {
          toast(response.data.updateClaimStatusByAgent.msg, {
            position: "top-right",
            hideProgressBar: true,
            className: "bg-success text-white",
            transition: Slide,
            autoClose: 2000,
            closeOnClick: true,
          });
          refetch();
          setRemarks("")
        }
      } else {
        return toast(response.data.updateClaimStatusByAgent.msg, {
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
              claimRequestId: id,
            },
            image: productImages, // need to change this
          },
        });
        console.log("RESPONSE = ", response);
        if (response?.data) {
          toast(response?.data?.uploadWarrantyProductImageByAgent?.message, {
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
        className: "bg-danger text-white",
        transition: Slide,
        autoClose: 2000,
        closeOnClick: true,
      });
    }
  };
  const resetReturnStatus = () => {
    if (
      warrantyDetail?.claimStatus === "POSTPONED" ||
      warrantyDetail?.claimStatus === "OUT_FOR_DELIVERY" ||
      warrantyDetail?.claimStatus === "REJECTED" ||
      warrantyDetail?.claimStatus === "REPLACEMENT_COMPLETED" ||
      warrantyDetail?.claimStatus === "RETURNED_TO_WAREHOUSE"
    ) {
      setClaimStatus(warrantyDetail?.claimStatus);
    } else {
      setClaimStatus("");
    }
  };

  useEffect(() => {
    if (warrantyDetail) {
      resetReturnStatus();
    }
  }, [warrantyDetail, orderData, refetch]);
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
                        <p>Warranty ID :</p> <p>{warrantyDetail?.warrantyId}</p>
                      </div>
                      <div>
                        <p>Customer :</p>{" "}
                        <p className="text-capitalize">{warrantyDetail?.warrantyAddress?.firstname}</p>
                      </div>
                      <div>
                        <p>Date :</p>{" "}
                        <p>
                          {warrantyDetail?.deliveryAgentAssignedOn &&
                            new Date(warrantyDetail?.deliveryAgentAssignedOn)
                              .toLocaleDateString("en-GB")
                              .replace(/\//g, "-")}
                        </p>
                      </div>
                      <div>
                        <p>Contact :</p> <p>+968 {warrantyDetail?.warrantyAddress?.mobile}</p>
                      </div>
                      <div>
                        <p>payment Type :</p>{" "}
                        <p>
                          {warrantyDetail?.product?.paymentMode === "COD"
                            ? "Cash On Delivery"
                            : warrantyDetail?.product?.paymentMode === "CARD"
                            ? "Card On Delivery"
                            : warrantyDetail?.product?.paymentMode}
                        </p>
                      </div>
                      <div>
                        <p>payable :</p> <p>{warrantyDetail?.product?.sellingPrice} OMR</p>
                      </div>
                      <div>
                        <p>Address :</p>{" "}
                        <p className="text-capitalize">
                          {[warrantyDetail?.warrantyAddress?.address, warrantyDetail?.warrantyAddress?.postCode]
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
                              warrantyDetail?.claimStatus === "APPROVED"
                                ? "#F97316"
                                : warrantyDetail?.claimStatus === "POSTPONED"
                                ? "#5a6f05"
                                : warrantyDetail?.claimStatus === "COLLECTED"
                                ? "#4947D0"
                                : warrantyDetail?.claimStatus === "RETURNED TO WAREHOUSE"
                                ? "#005E2B"
                                : warrantyDetail?.claimStatus === "REJECTED"
                                ? "#E30613"
                                : "#000",
                            textTransform: "uppercase",
                          }}
                        >
                          {warrantyDetail?.claimStatus === "APPROVED"
                            ? "Return Requested"
                            : warrantyDetail?.claimStatus === "POSTPONED"
                            ? "Postponed to Tomorrow"
                            : warrantyDetail?.claimStatus.toLowerCase()}
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
                      value={warrantyDetail?.replacementDeliveredLocation ?? trackingLink}
                      invalid={linkInvalid}
                      disabled={warrantyDetail?.replacementDeliveredLocation}
                      onChange={(e) => {
                        setLinkInvalid(false);
                        setTrackingLink(e.target.value);
                      }}
                    />
                    {warrantyDetail?.replacementDeliveredLocation ? (
                      <CustomButton
                        name="Open"
                        padding="0 25px"
                        onClick={() => window.open(warrantyDetail?.replacementDeliveredLocation, "_blank")}
                      />
                    ) : (
                      <CustomButton
                        name="Save"
                        padding="0 25px"
                        onClick={submitTrackingLink}
                      />
                    )}

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
                        <Label className="form-label ">Warranty Status </Label>

                        <Input
                          name="claimStatus"
                          placeholder="Select"
                          type="select"
                          className={styles.select_box}
                          value={claimStatus}
                          onChange={(e) => {
                            setClaimStatus(e.target.value);
                            if (e.target.value === "OUT_FOR_DELIVERY") {
                              handleWarrantyStatus(e.target.value);
                            } else {
                              setOpenRemarks(true);
                            }
                          }}
                        >
                          <option
                            value=""
                            disabled
                          >
                            select
                          </option>
                          <option value={"REJECTED"}>Reject</option>
                          <option value={"POSTPONED"}>Postponed</option>
                          <option value={"OUT_FOR_DELIVERY"}>Out for delivery</option>
                          <option value={"REPLACEMENT_COMPLETED"}>Completed</option>
                          <option value={"RETURNED_TO_WAREHOUSE"}>Returned to Warehouse</option>
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
                    href={`tel:+968${warrantyDetail?.warrantyAddress?.mobile}`}
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
                    // onClick={handleWarrantyStatus}
                  /> */}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className={`${styles.call_box} d-md-none`}>
        <a
          href={`tel:+968${warrantyDetail?.warrantyAddress?.mobile}`}
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
          // onClick={handleWarrantyStatus}
        /> */}
      </div>
      <WarrantyRemarkPopup
        remarks={remarks}
        setRemarks={setRemarks}
        submit={handleWarrantyStatus}
        isOpen={openRemarks}
        toggle={openRemarksToggle}
      />
      <WarrantyOtpPopup
        isOpen={openOtp}
        setOpenOtp={setOpenOtp}
        toggle={openOtpToggle}
        claimRequestId={id}
        claimStatus={claimStatus}
        remarks={remarks}
        refetch={refetch}
      />
      <ToastContainer />
    </React.Fragment>
  );
};

export default WarrantyDetail;
