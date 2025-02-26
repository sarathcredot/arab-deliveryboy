import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Alert,
  CardBody,
  Button,
  Label,
  Input,
  FormFeedback,
  Form,
  ButtonToggle,
  FormGroup,
} from "reactstrap";
import Loader from "src/components/Common/Loader";
import withRouter from "../../components/Common/withRouter";
import avatar from "../../assets/images/icons/user.png";
import { gql, useMutation, useQuery } from "@apollo/client";
import CustomButton from "src/components/Common/CustomButton";
import Confirmation from "src/components/Confirmation";
import { Slide, toast, ToastContainer } from "react-toastify";
import Breadcrumbs from "../../components/Common/Breadcrumb";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Profile", link: "/profile" },
];

const GET_DATA = gql`
  query GetDeliveryAgentByAgent($input: GetDeliveryAgentByAgentInput!) {
    getDeliveryAgentByAgent(input: $input) {
      deliveryAgent {
        _id
        fullName
        contactNumber
        userID
        ID
        agentType
        isActive
        isAvailable
        vendorID
      }
    }
  }
`;

const UPDATE_AVAILABILITY = gql`
  mutation UpdateAvailableStatus($input: UpdateAvailableStatusInput!) {
    updateAvailableStatus(input: $input) {
      _id
      message
    }
  }
`;

const CHANGE_PASSWORD = gql`
  mutation ResetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      success
      message
    }
  }
`;

const UserProfile = () => {
  document.title = "Profile | Arabdeals-Agent & Dashboard";
  const [agent, setAgent] = useState<any>({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [invalid1, setInvalid1] = useState(false);
  const [invalid2, setInvalid2] = useState(false);
  const [isToggled, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!isToggled);
  };

  const {
    data: walletData,
    loading: walletDataLoading,
    error: walletDataError,
    refetch,
  } = useQuery(GET_DATA, {
    variables: {
      input: {},
    },
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    if (walletData && walletData?.getDeliveryAgentByAgent?.deliveryAgent) {
      setAgent(walletData?.getDeliveryAgentByAgent?.deliveryAgent);
    }
  }, [walletData]);
  console.log("AGENT = ", agent);

  const [updateAvailability] = useMutation(UPDATE_AVAILABILITY);
  const handleAvailability = async () => {
    try {
      const response = await updateAvailability({
        variables: {
          input: {
            isAvailable: !agent.isAvailable,
          },
        },
      });
      if (response?.data?.updateAvailableStatus) {
        toast(response?.data?.updateAvailableStatus?.message || "Availability Updated", {
          position: "top-right",
          hideProgressBar: true,
          className: "bg-success text-white",
          transition: Slide,
          autoClose: 2000,
          closeOnClick: true,
        });
        handleToggle();
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
    refetch();
  };
  const [changePassword] = useMutation(CHANGE_PASSWORD);

  const handleSubmit = async () => {
    try {
      if (!password) return setInvalid1(true);
      if (!confirmPassword) return setInvalid2(true);
      if (password !== confirmPassword) {
        toast("Password and confirm password do not match", {
          position: "top-right",
          hideProgressBar: true,
          className: "bg-danger text-white",
          transition: Slide,
          autoClose: 2000,
          closeOnClick: true,
        });

        return setInvalid2(true);
      }

      const response = await changePassword({
        variables: {
          input: {
            newPassword: confirmPassword,
          },
        },
      });

      console.log("RESPONSE = ", response);
      if (response?.data?.resetPassword?.success) {
        console.log(response?.data?.resetPassword?.message);
        toast(response?.data?.resetPassword?.message, {
          position: "top-right",
          hideProgressBar: true,
          className: "bg-success text-white",
          transition: Slide,
          autoClose: 2000,
          closeOnClick: true,
        });
        refetch();
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

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs breadcrumbs={breadcrumbItems} />
          <Row
            style={{
              gap: 0,
            }}
          >
            <Col
              lg="12"
              style={{
                padding: "8px 5px",
                display: "grid",
              }}
            >
              <Card
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 10,
                  margin: 0,
                }}
              >
                {walletDataLoading ? (
                  <Loader />
                ) : (
                  <CardBody className="d-flex ">
                    <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                      <div>
                        <img
                          src={avatar}
                          alt="avatar"
                          className="avatar-lg rounded-circle img-thumbnail"
                        />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "5px", width: "100%" }}>
                        <h5 style={{ margin: " 0", textTransform: "capitalize" }}>
                          {(agent?.fullName && agent?.fullName) || "User"}
                        </h5>
                        <div style={{ display: "flex", gap: 10 }}>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                            <p className="mb-0"> {agent?.userID || "nill"}</p>
                            <p className="mb-0"> {`+968 ${agent?.contactNumber}` || "nill"}</p>
                            <FormGroup
                              switch
                              className="mt-2"
                            >
                              <Input
                                className={agent?.isAvailable === true ? "bg-success border-success" : ""}
                                type="switch"
                                style={{ width: "40px", height: "20px" }}
                                checked={agent?.isAvailable}
                                onChange={handleToggle}
                              />
                              <Label
                                style={{ marginTop: "3px", marginLeft: "10px" }}
                                check
                              >
                                {agent?.isAvailable === true ? "Available" : "Not Available"}
                              </Label>
                            </FormGroup>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                )}
              </Card>
            </Col>
            <Col
              lg="12"
              style={{
                padding: "8px 5px",
                display: "grid",
              }}
            >
              <div
                style={{
                  border: "1px solid #ddd",
                  borderRadius: 10,
                  padding: 20,
                }}
              >
                <h5>Change Password</h5>
                <Form
                  className="w-100"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit();
                  }}
                >
                  <Label className="p-0 my-1 fw-normal">password:</Label>
                  <Input
                    invalid={invalid1}
                    className="mb-2"
                    onChange={(e) => {
                      setInvalid1(false);
                      setPassword(e.target.value);
                    }}
                  />
                  <Label className="p-0 my-1 fw-normal">confirm password:</Label>
                  <Input
                    invalid={invalid2}
                    className="mb-2"
                    onChange={(e) => {
                      setInvalid2(false);
                      setConfirmPassword(e.target.value);
                    }}
                  />
                  <CustomButton
                    className={"mx-auto mt-4 "}
                    name="Change"
                    padding="0 25px"
                    type="submit"
                    width="150px"
                    // onClick={submitTrackingLink}
                  />
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Confirmation
        isOpen={isToggled}
        toggle={handleToggle}
        submit={handleAvailability}
      />
      <ToastContainer />
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
