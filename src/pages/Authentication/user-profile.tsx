import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Alert, CardBody, Button, Label, Input, FormFeedback, Form } from "reactstrap";
import withRouter from "../../components/Common/withRouter";
import avatar from "../../assets/images/users/avatar-1.jpg";
import { gql, useQuery } from "@apollo/client";

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
        vendorID
      }
    }
  }
`;

const UserProfile = () => {
  document.title = "Profile | Arabdeals-Agent & Dashboard";
  const [agent, setAgent] = useState<any>({});

  const {
    data: walletData,
    loading: walletDataLoading,
    error: walletDataError,
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
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Row>
            <Col lg="12" style={{
              padding:0
            }}>
              <Card>
                <CardBody>
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center ms-3">
                      <div className="text-muted">
                        <h5>{agent?.fullName}</h5>
                        <p className="mb-1">Phone: {agent?.contactNumber}</p>
                        <p className="mb-0">Agent Type: {agent?.agentType}</p>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(UserProfile);
