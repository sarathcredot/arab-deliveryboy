import React, { useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb2";
import { Container } from "reactstrap";


const Orders = () => {
  const orders = [
    {
      id: "ORD12345",
      status: "Out for Delivery",
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
      status: "Cancelled",
      username: "Alice Johnson",
      address: "789 Pine Avenue, Chicago, IL",
      orderDate: "2024-12-20",
    },
    {
      id: "ORD12348",
      status: "Delivered",
      username: "Bob Brown",
      address: "321 Oak Lane, Houston, TX",
      orderDate: "2024-12-19",
    },
    {
      id: "ORD12346",
      status: "Cancelled",
      username: "Jane Smith",
      address: "456 Elm Street, Los Angeles, CA",
      orderDate: "2024-12-21",
    },
  ];

  const [filteredOrders, setFilteredOrders] = useState(orders);

  const handleFilterChange = (filter: string) => {
    if (filter === "All") {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === filter));
    }
  };

  // const breadcrumbItems = [
  //   {title:"Dashboard" ,link:"/dashboard"},
  //   {title:"Pendind Orders",link:"" },
  
  // ]

 

  document.title = "Orders | Minia - React Admin & Dashboard Template";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid style={{paddingRight:"0px",paddingLeft:"0px"}}>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Pending orders"
            onFilterChange={handleFilterChange}
          />
          <div className="order-outer-div">
            {filteredOrders.map((order) => (
              <div className="order-card" key={order.id}>
                <div className="order-card-header">
                  <span className={`order-status ${order.status.toLowerCase().replace(/\s+/g, '')}`}>{order.status}</span>
                  <h5 className="order-id">
                      <span className="label">Order ID:</span> 
                      <span className="value">{order.id}</span>
                    </h5>
                </div>
                <div className="order-card-body">
                  <p className="address">{order.address}</p>
                  <div className="customer-order-date-row">
                    <div>
                    <p className="username">Customer</p>
                    <p className="order-user">  {order.username}</p>
                    </div>
                    <div>
                    <p className="order-date">Date</p>
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
