import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

import RadialChart1 from "./userpanelChart1";
import RadialChart2 from "./userpanelChart2";
import CreateInvoice from "./CreateInvoice";
import Createquotation from "./Createquotation";
import CreateSalesInvoice from "./CreateSalesInvoice";

const UserPanel = ({ transactions }) => {
  return (
    <React.Fragment>
      <Row>
        {/* Total Payment */}
        <Col xl={3} sm={6}>
          <Card className="h-100">
            <CardBody className="d-flex flex-column">
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <RadialChart1 />
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Total Payment</p>
                  <h5 className="mb-3">5000</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Expense */}
        <Col xl={3} sm={6}>
          <Card className="h-100">
            <CardBody className="d-flex flex-column">
              <div className="d-flex">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <RadialChart2 />
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Expense</p>
                  <h5 className="mb-3">1500</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Create Invoice */}
        <Col xl={3} sm={6}>
          <Card className="h-100">
            <CardBody className="d-flex flex-column">
              <div>
                <CreateInvoice transactions={transactions} />
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Create Quotation */}
        <Col xl={3} sm={6}>
          <Card className="h-100">
            <CardBody className="d-flex flex-column">
              <div>
                <Createquotation transactions={transactions} />
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Create Sales Invoice */}
        <Col xl={3} sm={6} className="mt-4">
          <Card className="h-100">
            <CardBody className="d-flex flex-column">
              <div> 
                <CreateSalesInvoice transactions={transactions} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default UserPanel;
