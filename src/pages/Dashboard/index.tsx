import React from "react";

//import Breadcrumbs
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Col, Container, Row } from "reactstrap";
import OrdersCount from "src/components/TotalCounts/OrdersCount";

const Dashboard = () => {
  //meta title
  document.title = "Dashboard | Minia - React Admin & Dashboard Template";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Dashboard"
            breadcrumbItem="Dashboard"
          />
          <Row style={{
            gap:0
          }}>
            <Col style={{
              margin:0,
              padding:0
            }}>
              <OrdersCount />
            </Col>
            <Col>
              <OrdersCount />
            </Col>
            <Col>
              <OrdersCount />
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
