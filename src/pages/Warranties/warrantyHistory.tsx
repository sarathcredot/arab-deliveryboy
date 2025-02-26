import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/BreadcrumbWarranty";
import { Container } from "reactstrap";
import { gql, useMutation, useQuery } from "@apollo/client";
import { Link } from "react-router-dom";



const GET__WARRANTY_HISTORY = gql`
    query GetHistoryOfWarrantyPickupsByAgent($input: getPendingWarrantyPickupsByAgentInput) {
  getHistoryOfWarrantyPickupsByAgent(input: $input) {
    success
    data {
      user
      product
      order
      _id
      productImage {
        fileType
        fileURL
        mimeType
        originalName
      }
      createdAt
      issueDescription
      warrantyId
      claimStatus
      claimType
      claimDate
      warrantyAddress {
        firstname
        email
        mobile
        country
        postCode
        governorate
        village
        governorateID
        villageID
        address
      }
    }
    maxRecords
  }
}
`;


const WarrantyHistory = () => {

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
    } = useQuery(GET__WARRANTY_HISTORY, {
      variables: {
        input: {
          page: null,
          size: null,
          claimStatus: filter === "All" ? null : filter,
        },
      },
      fetchPolicy: "network-only"
    });
  
    useEffect(() => {
      if (ordersData && ordersData.getHistoryOfWarrantyPickupsByAgent) {
        console.log("response",ordersData)
        setOrders(ordersData.getHistoryOfWarrantyPickupsByAgent.data);
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
            title="Warranty Pickups History"
            onFilterChange={handleFilterChange}
          />
          <div className="order-outer-div">
         {ordersData?.getHistoryOfWarrantyPickupsByAgent?.data?.length === 0 ? (
          <p>No warranty pickups found</p>
         ) :(
          
          orders.map((order) => (
            <Link to={`/returns/detail/${order._id}`} key={order._id}>
            <div className="order-card" key={order._id}>
              <div className="order-card-header">
              {order.claimStatus === "APPROVED" ? (
                    <span className={`order-status ${order.claimStatus.toLowerCase().replace(/\s+/g, '')}`}>
                      warranty Requested
                    </span>
                  ) : (
        
                    <span
                        className={`order-status ${order.claimStatus.toLowerCase().replace(/\s+/g, '')}`}
                      >
                        {order.claimStatus
                          .toLowerCase()
                          .replace(/(?:^|\s)\w/g, (match:string) => match.toUpperCase())}
                      </span>
                  )}
                <h5 className="order-id">
                    <span className="label">Order ID:</span> 
                    <span className="value">{order.order}</span>
                  </h5>
              </div>
              <div className="order-card-body">
                <p className="address">
                      {[order?.warrantyAddress?.address, order?.returnAddress?.country]
                        .filter(Boolean) 
                        .join(', ')}    
                    </p>

                <div className="customer-order-date-row">
                  <div>
                  <p className="username">Customer</p>
                  <p className="order-user"> {order?.warrantyAddress?.firstname}</p>
                  </div>
                  <div>
                  <p className="order-date">Date</p>
                  <p className="date"> {new Date(order.claimDate).toLocaleDateString("en-GB").replace(/\//g, "-")}</p>
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

export default WarrantyHistory;
