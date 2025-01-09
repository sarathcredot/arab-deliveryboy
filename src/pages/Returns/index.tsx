import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/BreadcrumbReturn";
import { Container } from "reactstrap";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const GET__RETURNS = gql`
query getPendingReturnsByAgent($input: GetAssignedReturnOrderInput!) {
  getPendingReturnsByAgent(input: $input) {
    records {
      _id
      userId {
        _id
        fullName
      }
      orderId
      itemId
      productName
      skuId
      orderDate
      deliveryDate
      returnStatus
      returnUserReason
      returnAdminComment
      returnOrderAssignedOn
      returnRequestDate
      returnAddress {
        firstname
        email
        mobile
        streetName
        city
        houseNumber
        country
        postCode
        apartment
        suite
        unit
      }
    }
    totalCount
    page
    totalPages
  }
}
`;
const Return = () => {
  // const orderss = [
  //   {
  //     id: "ORD12345",
  //     status: "Return Requested",
  //     username: "John Doe",
  //     address: "123 Main Street, New York, NY",
  //     orderDate: "2024-12-22",
  //   },
  //   {
  //     id: "ORD12346",
  //     status: "Collected",
  //     username: "Jane Smith",
  //     address: "456 Elm Street, Los Angeles, CA",
  //     orderDate: "2024-12-21",
  //   },
  //   {
  //     id: "ORD12347",
  //     status: "Rejected",
  //     username: "Alice Johnson",
  //     address: "789 Pine Avenue, Chicago, IL",
  //     orderDate: "2024-12-20",
  //   },
  //   {
  //     id: "ORD12348",
  //     status: "Returned to Warehouse",
  //     username: "Bob Brown",
  //     address: "321 Oak Lane, Houston, TX",
  //     orderDate: "2024-12-19",
  //   },
  // ];

  // const breadcrumbItems = [
  //   {title:"Dashboard" ,link:"/dashboard"},
  //   {title:"Pendind Orders",link:"" },
  
  // ]

 

  document.title = "Orders | Arabdeals-Agent & Dashboard";

   const [currentPage, setCurrentPage] = useState(null);
    const [pageSize] = useState(null);
    const [filter, setFilter] = useState<string>("All");
    const [orders, setOrders] = useState<any[]>([]);
  
    const {
      loading: ordersLoading,
      error: ordersError,
      data: ordersData,
      refetch: refetchOrders,
    } = useQuery(GET__RETURNS, {
      variables: {
        input: {
          page: null,
          limit: null,
          returnStatus: filter === "All" ? null : filter,
        },
      },
      fetchPolicy: "network-only"
    });
  
    useEffect(() => {
      if (ordersData && ordersData.getPendingReturnsByAgent) {
        console.log("response",ordersData)
        setOrders(ordersData.getPendingReturnsByAgent.records);
      }
    }, [ordersData]);
  
    const handleFilterChange = (newFilter: string) => {
      console.log(newFilter);
      setFilter(newFilter);
      refetchOrders({
        input: {
          page: currentPage,
          size: pageSize,
          shippingStatus: newFilter === "All" ? null : newFilter,
        },
      });
    };
  
    if (ordersError) {
      console.error("Error fetching orders:", ordersError);
    }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid className="px-2">
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            title="Pending Returns"
            onFilterChange={handleFilterChange}
            isHistory={true}
          />
          <div className="order-outer-div">
         {ordersData?.getPendingReturnsByAgent?.records?.length === 0 ? (
          <p>No orders found</p>
         ) :(
          
          orders.map((order) => (
            <Link to={`/returns/detail/${order._id}`} key={order._id}>
            <div className="order-card" key={order._id}>
              <div className="order-card-header">
              {order.returnStatus === "APPROVED" ? (
                    <span className={`order-status ${order.returnStatus.toLowerCase().replace(/\s+/g, '')}`}>
                      Return Requested
                    </span>
                  ) : (
        
                    <span
                        className={`order-status ${order.returnStatus.toLowerCase().replace(/\s+/g, '')}`}
                      >
                        {order.returnStatus
                          .toLowerCase()
                          .replace(/(?:^|\s)\w/g, (match:string) => match.toUpperCase())}
                      </span>
                  )}
                <h5 className="order-id">
                    <span className="label">Order ID:</span> 
                    <span className="value">{order.orderId}</span>
                  </h5>
              </div>
              <div className="order-card-body">
                <p className="address">
                      {[order?.returnAddress?.houseNumber, order?.returnAddress?.apartment, order?.returnAddress?.city, order?.returnAddress?.country]
                        .filter(Boolean) 
                        .join(', ')}    
                    </p>

                <div className="customer-order-date-row">
                  <div>
                  <p className="username">Customer</p>
                  <p className="order-user"> {order?.returnAddress?.firstname}</p>
                  </div>
                  <div>
                  <p className="order-date">Date</p>
                  <p className="date"> {new Date(order.orderDate).toLocaleDateString("en-GB").replace(/\//g, "-")}</p>
                  </div>
                </div>
              </div>
            </div>
            </Link>
          ))
         ) 
          }
          </div>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Return;
