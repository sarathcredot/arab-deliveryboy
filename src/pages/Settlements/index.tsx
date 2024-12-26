import React from "react";
import { Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import incomeIcon from "../../assets/images/icons/income1.svg";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Settlements", link: "" },
];

const Settlements = () => {
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
                <div>
                  <h4>526.81 OMR</h4>
                  <p>Cash in Hand</p>
                </div>
                <img
                  src={incomeIcon}
                  alt="icon"
                />
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
          <Row style={{
            padding:"0 6px"
          }}>
            <Col lg={4} style={{
              padding:"6px"
            }}>
              <div 
               style={{
                border: "1px solid #DDDDDD",
                borderRadius: "10px",
                padding: "20px",
                display: "flex",
                flexDirection:"column",
                gap:10
              }}
              >
                <p>
                  Date: <span style={{
                    fontWeight:"bold"
                  }}>22/10/2024</span>
                </p>
                <p style={{
                  fontWeight:"bold"
                }}>Lorem ipsum amet set que insed, lorem ipsum sed amet que.</p>
                <div className="d-flex gap-4">
                  <div>
                    <p style={{
                      marginBottom:7
                    }}>Settled</p>
                    <h5>256.00 OMR</h5>
                  </div>
                  <div>
                    <p style={{
                      marginBottom:7
                    }}>Balance</p>
                    <h5>526.81 OMR</h5>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4} style={{
              padding:"6px"
            }}>
              <div 
               style={{
                border: "1px solid #DDDDDD",
                borderRadius: "10px",
                padding: "20px",
                display: "flex",
                flexDirection:"column",
                gap:10
              }}
              >
                <p>
                  Date: <span style={{
                    fontWeight:"bold"
                  }}>22/10/2024</span>
                </p>
                <p style={{
                  fontWeight:"bold"
                }}>Lorem ipsum amet set que insed, lorem ipsum sed amet que.</p>
                <div className="d-flex gap-4">
                  <div>
                    <p style={{
                      marginBottom:7
                    }}>Settled</p>
                    <h5>256.00 OMR</h5>
                  </div>
                  <div>
                    <p style={{
                      marginBottom:7
                    }}>Balance</p>
                    <h5>526.81 OMR</h5>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4} style={{
              padding:"6px"
            }}>
              <div 
               style={{
                border: "1px solid #DDDDDD",
                borderRadius: "10px",
                padding: "20px",
                display: "flex",
                flexDirection:"column",
                gap:10
              }}
              >
                <p>
                  Date: <span style={{
                    fontWeight:"bold"
                  }}>22/10/2024</span>
                </p>
                <p style={{
                  fontWeight:"bold"
                }}>Lorem ipsum amet set que insed, lorem ipsum sed amet que.</p>
                <div className="d-flex gap-4">
                  <div>
                    <p style={{
                      marginBottom:7
                    }}>Settled</p>
                    <h5>256.00 OMR</h5>
                  </div>
                  <div>
                    <p style={{
                      marginBottom:7
                    }}>Balance</p>
                    <h5>526.81 OMR</h5>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4} style={{
              padding:"6px"
            }}>
              <div 
               style={{
                border: "1px solid #DDDDDD",
                borderRadius: "10px",
                padding: "20px",
                display: "flex",
                flexDirection:"column",
                gap:10
              }}
              >
                <p>
                  Date: <span style={{
                    fontWeight:"bold"
                  }}>22/10/2024</span>
                </p>
                <p style={{
                  fontWeight:"bold"
                }}>Lorem ipsum amet set que insed, lorem ipsum sed amet que.</p>
                <div className="d-flex gap-4">
                  <div>
                    <p style={{
                      marginBottom:7
                    }}>Settled</p>
                    <h5>256.00 OMR</h5>
                  </div>
                  <div>
                    <p style={{
                      marginBottom:7
                    }}>Balance</p>
                    <h5>526.81 OMR</h5>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={4} style={{
              padding:"6px"
            }}>
              <div 
               style={{
                border: "1px solid #DDDDDD",
                borderRadius: "10px",
                padding: "20px",
                display: "flex",
                flexDirection:"column",
                gap:10
              }}
              >
                <p>
                  Date: <span style={{
                    fontWeight:"bold"
                  }}>22/10/2024</span>
                </p>
                <p style={{
                  fontWeight:"bold"
                }}>Lorem ipsum amet set que insed, lorem ipsum sed amet que.</p>
                <div className="d-flex gap-4">
                  <div>
                    <p style={{
                      marginBottom:7
                    }}>Settled</p>
                    <h5>256.00 OMR</h5>
                  </div>
                  <div>
                    <p style={{
                      marginBottom:7
                    }}>Balance</p>
                    <h5>526.81 OMR</h5>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Settlements;
