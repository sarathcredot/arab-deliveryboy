import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb2";
import { Container } from "reactstrap";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";




const GET_PENDING_ORDERS = gql`
    query GetAssignedOrderByAgentProfile($input: getAssignedOrderByAgentProfileInput) {
          getAssignedOrderByAgentProfile(input: $input) {
            records {
              _id
              orderId
              userId
              productName
              itemId
              sellingPrice
              paymentStatus
              paymentMode
              orderDate
              shippingStatus
              deliveryAgentId
              userName
              email
              mobileNumber
              houseNumber
              streetName
              apartment
              suite
              unit
              city
              country
              postCode
            }
            maxRecords
          }
        }
`;

// const orderss = [
//   {
//     id: "ORD12345",
//     status: "Out for Delivery",
//     username: "John Doe",
//     address: "123 Main Street, New York, NY",
//     orderDate: "2024-12-22",
//   },
//   {
//     id: "ORD12346",
//     status: "Delivered",
//     username: "Jane Smith",
//     address: "456 Elm Street, Los Angeles, CA",
//     orderDate: "2024-12-21",
//   },
//   {
//     id: "ORD12347",
//     status: "Cancelled",
//     username: "Alice Johnson",
//     address: "789 Pine Avenue, Chicago, IL",
//     orderDate: "2024-12-20",
//   },
//   {
//     id: "ORD12348",
//     status: "Delivered",
//     username: "Bob Brown",
//     address: "321 Oak Lane, Houston, TX",
//     orderDate: "2024-12-19",
//   }]

const Orders = () => {

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
  } = useQuery(GET_PENDING_ORDERS, {
    variables: {
      input: {
        page: currentPage,
        size: pageSize,
        shippingStatus: filter === "All" ? null : filter,
      },
    },
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    if (ordersData && ordersData.getAssignedOrderByAgentProfile) {
      console.log("response",ordersData)
      setOrders(ordersData.getAssignedOrderByAgentProfile.records);
    }
  }, [ordersData]);

  // Handle pagination
  // const totalRecords = ordersData?.getAssignedOrderByAgentProfile?.maxRecords || 0;
  // const totalPages = Math.ceil(totalRecords / pageSize);

  // const handlePageChange = (newPage: number) => {
  //   setCurrentPage(newPage);
  //   refetchOrders({
  //     input: {
  //       page: newPage,
  //       size: pageSize,
  //       shippingStatus: filter === "All" ? null : filter,
  //     },
  //   });
  // };

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
            title="Orders History"
            onFilterChange={handleFilterChange}
          />
          <div className="order-outer-div">

            {ordersData?.getAssignedOrderByAgentProfile?.records?.length === 0 ? (
              <p>No Orders Found</p>
            ):(
              orders.map((order) => (
                <Link to={`/orders/detail/${order._id}`} key={order._id}>
                 <div className="order-card" >
                  <div className="order-card-header">
                    <span className={`order-status ${order.shippingStatus.toLowerCase().replace(/\s+/g, '')}`}>{order.shippingStatus
                        .toLowerCase()
                        .replace(/(?:^|\s)\w/g, (match:string) => match.toUpperCase())}</span>
                    <h5 className="order-id">
                        <span className="label">Order ID:</span> 
                        <span className="value">{order.orderId}</span>
                      </h5>
                  </div>
                  <div className="order-card-body">
                   <p className="address">
                      {`${order.houseNumber}, ${order.apartment}, ${order.city}, ${order.country}`}
                    </p>
                    <div className="customer-order-date-row">
                      <div>
                      <p className="username">Customer</p>
                      <p className="order-user">  {order.userName}</p>
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

export default Orders;
