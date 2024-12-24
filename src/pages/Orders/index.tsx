import React from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { Container } from "reactstrap";


const Orders = () => {
  const orders = [
    {
      id: "ORD12345",
      status: "OutforDelivery",
      username: "John Doe",
      address: "123 Main Street, New York, NY",
      orderDate: "2024-12-22",
    },
    {
      id: "ORD12346",
      status: "Delivered",
      username: "Jane Smith",
      address: "456 Elm Street, Los Angeles, CA",
      orderDate: "2024-12-21",
    },
    {
      id: "ORD12347",
      status: "Pending",
      username: "Alice Johnson",
      address: "789 Pine Avenue, Chicago, IL",
      orderDate: "2024-12-20",
    },
    {
      id: "ORD12348",
      status: "Pending",
      username: "Bob Brown",
      address: "321 Oak Lane, Houston, TX",
      orderDate: "2024-12-19",
    },
    {
      id: "ORD12346",
      status: "Delivered",
      username: "Jane Smith",
      address: "456 Elm Street, Los Angeles, CA",
      orderDate: "2024-12-21",
    },
  ];

  document.title = "Orders | Minia - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="Pending Orders" breadcrumbItem="Pending Orders" />
          <div className="order-outer-div">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-card-header">
                  <span className={`order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                  <h5 className="order-id">
                      <span className="label">Order ID:</span> 
                      <span className="value">{order.id}</span>
                    </h5>
                </div>
                <div className="order-card-body">
                  <p className="address">Address: {order.address}</p>
                  <div className="customer-order-date-row">
                    <div>
                    <p className="username">Customer</p>
                    <p className="order-user">  {order.username}</p>
                    </div>
                    <div>
                    <p className="order-date">Order Date</p>
                    <p className="date"> {order.orderDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Orders;
