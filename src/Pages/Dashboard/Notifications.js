import React from "react";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { Card, CardBody, CardTitle, Col } from "reactstrap";

const Notifications = () => {
 

  return (
    <React.Fragment>
      <Col lg={4}>
        <Card>
          <CardBody>
            <CardTitle>Notifications (Due Payments)</CardTitle>
            <div className="pe-3">
              <SimpleBar style={{ maxHeight: "287px" }}>
                    <Link to="#" className="text-body d-block">
                      <div className="d-flex py-3">
                        <div className="flex-shrink-0 me-3 align-self-center">
                          <div className="avatar-xs">
                            <span className="avatar-title bg-primary-subtle rounded-circle text-primary">
                              <i className="mdi mdi-account"></i>
                            </span>
                          </div>
                        </div>
                        <div className="flex-grow-1 overflow-hidden">
                          <h5 className="font-size-14 mb-1">gfg</h5>
                          <p className="text-truncate mb-0">ID</p>
                          <p className="text-truncate mb-0">
                          </p>{" "}
                          {/* ✅ Show Prev Amount */}
                        </div>
                        <div className="flex-shrink-0 font-size-13 text-end">
                        </div>
                      </div>
                    </Link>
              </SimpleBar>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default Notifications;
