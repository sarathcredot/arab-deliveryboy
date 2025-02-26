
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Row, Col, BreadcrumbItem } from "reactstrap";
import filtericon from '../../assets/images/FilterIcon.svg'


interface BreadcrumbProps {
  title: string;
  onFilterChange: (filter: string) => void; 
  isHistory?:boolean;
}
const Breadcrumb = ({ title, onFilterChange,isHistory}: BreadcrumbProps) => {
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const toggleFilterOptions = () => {
    setShowFilterOptions((prev) => !prev);
  };

  const applyFilter = (filter: string) => {
    console.log("Selected Filter:", filter);
    onFilterChange(filter); 
    setShowFilterOptions(false); 
  };

  return (
    <>
    <Row>
      <Col xs={12}>
        <div className="page-title-box  align-items-center justify-content-between" style={{display:"flex"}}>
          <h4 className="mb-0 font-size-18"   style={{fontFamily:'"Urbanist", serif',fontWeight:"600"}}>{title}</h4>
          <div className="page-title-right" style={{display:"flex",gap:"10px"}}>
            {isHistory && (
              <Link to={"/warranty-history"} >
                   <button className="btn btn-dark btn-sm" style={{borderRadius:"30px",fontSize:"10px",fontWeight:"500",padding:"5px 15px"}} >History</button>
              </Link>
             
            )}
           
            <img  onClick={toggleFilterOptions} src={filtericon} alt="filter"/>
            
          </div>
        </div>
      </Col>
    </Row>
    {showFilterOptions && (
        <div className="filter-options">
          <ul className="filter-list">
            <li onClick={() => applyFilter("All")}>All</li>
            <li onClick={() => applyFilter("APPROVED")}>
              Warranty Requested
            </li>
            <li onClick={() => applyFilter("REPLACEMENT_COMPLETED")}>Completed</li>
            <li onClick={() => applyFilter("REJECTED")}>Rejected</li>
            <li onClick={() => applyFilter("RETURNED_TO_WAREHOUSE")}>Returned to Warehouse</li>
            <li onClick={() => applyFilter("POSTPONED")}>Postponed</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Breadcrumb;
