import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, BreadcrumbItem } from "reactstrap";

interface BreadcrumbProps {
  breadcrumbs: { title: string; link: string }[];
}

const Breadcrumb = ({ breadcrumbs }: BreadcrumbProps) => {
  return (
    <Row>
      <Col xs={12}>
        <div className="page-title-box d-sm-flex align-items-center justify-content-between">
          <h4 className="mb-0 font-size-18">{breadcrumbs[breadcrumbs.length - 1]?.title}</h4>
          <div className="page-title-right">
            <ol className="breadcrumb m-0">
              {breadcrumbs.map((breadcrumb, index) => (
                <BreadcrumbItem key={index} active={index === breadcrumbs.length - 1}>
                  {index === breadcrumbs.length - 1 ? (
                    breadcrumb.title
                  ) : (
                    <Link to={breadcrumb.link}>{breadcrumb.title}</Link>
                  )}
                </BreadcrumbItem>
              ))}
            </ol>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Breadcrumb;
