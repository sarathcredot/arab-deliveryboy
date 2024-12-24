import React from "react";

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Col, Container, Row } from "reactstrap";
import OrdersCount from "src/components/TotalCounts/OrdersCount";
import ReturnsCount from "src/components/TotalCounts/ReturnsCount";
import CashCount from "src/components/TotalCounts/CashCount";


const breadcrumbItems = [
  {title:"Dashboard" ,link:"/dashboard"}]
const Dashboard = () => {
  //meta title
  document.title = "Dashboard | Minia - React Admin & Dashboard Template";
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
            <Col lg={4} md={6} sm={12}
              style={{
                padding: 4,
              }}
            >
              <OrdersCount />
            </Col>
            <Col lg={4} md={6} sm={12}
              style={{
                padding: 4,
              }}
            >
              <ReturnsCount />
            </Col>
            <Col lg={4} md={6} sm={12}
              style={{
                padding: 4,
              }}
            >
              <CashCount />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
