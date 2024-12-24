import React from "react";
import { Container } from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";


const breadcrumbItems = [
  {title:"Dashboard" ,link:"/dashboard"},
  {title:"Returns",link:"/kljekr" },

]

const Returns = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs
            breadcrumbs={breadcrumbItems}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Returns;
