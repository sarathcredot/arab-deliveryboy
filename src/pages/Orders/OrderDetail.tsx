import React from "react";
import { Col, Container, Row } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { useSearchParams } from "react-router-dom";

const breadcrumbItems = [
  { title: "Dashboard", link: "/dashboard" },
  { title: "Orders", link: "/orders" },
  { title: "Order detail", link: "" },
];

const OrderDetail = () => {
    const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  console.log({orderId});
  

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs breadcrumbs={breadcrumbItems} />
          <Row>
            <Col style={{padding:"4px"}} >

            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default OrderDetail;
