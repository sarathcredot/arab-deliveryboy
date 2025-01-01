import React, { useEffect, useState } from "react";

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Col, Container, Row } from "reactstrap";
import OrdersCount from "src/components/TotalCounts/OrdersCount";
import ReturnsCount from "src/components/TotalCounts/ReturnsCount";
import CashCount from "src/components/TotalCounts/CashCount";
import { gql, useQuery } from "@apollo/client";

interface IWallet {
  cashInHand: number;
  lastSettlementDate: string;
  totalSettlement: number;
  grandTotal: number;
  numberOfOrderAssigned: number;
  numberOfOrderDelivered: number;
  numberOfReturnOrderAssigned: number;
  numberOfReturnOrderDelivered: number;
  numberOfPendingReturns: number;
  numberOfPendingOrdes: number;
}

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
        wallet {
          cashInHand
          lastSettlementDate
          totalSettlement
          grandTotal
          numberOfOrderAssigned
          numberOfOrderDelivered
          numberOfReturnOrderAssigned
          numberOfReturnOrderDelivered
          numberOfPendingReturns
          numberOfPendingOrdes
        }
      }
    }
  }
`;

const breadcrumbItems = [{ title: "Dashboard", link: "/dashboard" }];

const Dashboard = () => {
  //meta title
  document.title = "Dashboard | Arabdeals-Agent & Dashboard";

  const [wallet, setWallet] = useState<IWallet>();

  // wallet query
  const {
    data: walletData,
    loading: walletDataLoading,
    error: walletDataError,
  } = useQuery(GET_DATA, {
    variables: {
      input: {},
    },
  });

  useEffect(() => {
    if (walletData && walletData?.getDeliveryAgentByAgent?.deliveryAgent?.wallet) {
      setWallet(walletData?.getDeliveryAgentByAgent?.deliveryAgent?.wallet);
    }
  }, [walletData]);

  console.log("AGENT = ", wallet);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            // title="Home"
            breadcrumbs={breadcrumbItems}
          />
          <Row
            style={{
              gap: 0,
            }}
          >
            <Col
              lg={4}
              md={6}
              sm={12}
              style={{
                padding: 8,
              }}
            >
              <OrdersCount wallet={wallet && wallet} />
            </Col>
            <Col
              lg={4}
              md={6}
              sm={12}
              style={{
                padding: 8,
              }}
            >
              <ReturnsCount wallet={wallet && wallet} />
            </Col>
            <Col
              lg={4}
              md={6}
              sm={12}
              style={{
                padding: 8,
              }}
            >
              <CashCount wallet={wallet && wallet} />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
