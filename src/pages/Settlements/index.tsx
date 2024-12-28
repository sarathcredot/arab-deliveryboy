import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import incomeIcon from "../../assets/images/icons/income1.svg";
import { gql, useQuery } from "@apollo/client";
import Loader from "src/components/Common/Loader";
import { toast } from "react-toastify";
import NoDataAnimation from "src/components/Common/NoDataAnimation";

interface ISettlementHistory {
  _id: string;
  type: string;
  amount: number;
  remarks: string;
  totalAmount: number;
  balance: number;
  createdAt: string;
  updatedAt: string;
}
interface IWallet {
  cashInHand: number;
  lastSettlementDate: string;
  totalSettlement: number;
  grandTotal: number;
}

const GET_SETTLEMENTS = gql`
  query {
    getAgentSettlementHistoryByAgent {
      _id
      type
      amount
      remarks
      totalAmount
      balance
      createdAt
      updatedAt
    }
  }
`;

const GET_WALLET = gql`
  query GetDeliveryAgentByAgent($input: GetDeliveryAgentByAgentInput!) {
    getDeliveryAgentByAgent(input: $input) {
      deliveryAgent {
        wallet {
          cashInHand
        }
      }
    }
  }
`;

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Settlements", link: "" },
];

const Settlements = () => {
  const load = true;
  const [settlements, setSettlements] = useState<ISettlementHistory[]>([]);
  const [wallet, setWallet] = useState<IWallet>();
  // settlement query
  const {
    data: settlementsData,
    loading: settlementsDataLoading,
    error: settlementsDataError,
  } = useQuery(GET_SETTLEMENTS);
  // wallet query
  const {
    data: walletData,
    loading: walletDataLoading,
    error: walletDataError,
  } = useQuery(GET_WALLET, {
    variables: {
      input: {}
    },
  });

  if (settlementsData) {
    console.log("SETTLEMENTS  = ", settlements);
  }
  if (walletData) {
    console.log("WALLETS  = ", wallet);
  }

  useEffect(() => {
    if (settlementsData && settlementsData?.getAgentSettlementHistoryByAgent) {
      setSettlements(settlementsData.getAgentSettlementHistoryByAgent);
    }
  }, [settlementsData]);
  useEffect(() => {
    if (walletData && walletData?.getDeliveryAgentByAgent?.deliveryAgent?.wallet) {
      setWallet(walletData?.getDeliveryAgentByAgent?.deliveryAgent?.wallet);
    }
  }, [walletData]);

  if (settlementsDataError) {
    toast.error(settlementsDataError.message);
  }
  if (walletDataError) {
    toast.error(walletDataError.message);
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs breadcrumbs={breadcrumbItems} />
          <Row>
            <Col lg={5}>
              <div
                style={{
                  border: "1px solid #DDDDDD",
                  borderRadius: "10px",
                  padding: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {walletDataLoading ? (
                  <Loader />
                ) : (
                  <>
                    <div>
                      <h4>{wallet?.cashInHand} OMR</h4>
                      <p>Cash in Hand</p>
                    </div>
                    <img
                      src={incomeIcon}
                      alt="icon"
                    />
                  </>
                )}
              </div>
            </Col>
          </Row>
          <h5
            style={{
              fontSize: "18px",
              margin: "20px 0",
            }}
          >
            Settlement History
          </h5>
          {settlementsDataLoading ? (
            <Loader />
          ) : (
            <Row
              style={{
                padding: "0 6px",
              }}
            >
              {settlements && settlements?.length > 0 ? (
                settlements?.map((item, index) => (
                  <Col
                    lg={4}
                    style={{
                      padding: "6px",
                    }}
                    key={index}
                  >
                    <div
                      style={{
                        border: "1px solid #DDDDDD",
                        borderRadius: "10px",
                        padding: "20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: 10,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                        }}
                      >
                        <p>Date:</p>
                        <h6
                          style={{
                            fontSize: 16,
                            margin: 0,
                          }}
                        >
                          {new Date(item.createdAt).toLocaleDateString("en-GB").replace(/\//g, "-")}
                        </h6>
                      </div>
                      <h6
                        style={{
                          fontSize: "16.5px",
                          minHeight: "35px",
                        }}
                      >
                        {item?.remarks ? item.remarks : "No Remarks....."}
                        {/* Lorem ipsum amet set que insed, lorem ipsum sed amet que. */}
                      </h6>
                      <div className="d-flex gap-4">
                        <div>
                          <p
                            style={{
                              marginBottom: 7,
                            }}
                          >
                            Settled
                          </p>
                          <h6
                            style={{
                              fontSize: 16,
                            }}
                          >
                            {item.amount} OMR
                          </h6>
                        </div>
                        <div>
                          <p
                            style={{
                              marginBottom: 7,
                            }}
                          >
                            Balance
                          </p>
                          <h6
                            style={{
                              fontSize: 16,
                            }}
                          >
                            {item.balance} OMR
                          </h6>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))
              ) : (
                <NoDataAnimation message="NO SETTLEMENTS "/>
              )}
            </Row>
          )}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Settlements;
