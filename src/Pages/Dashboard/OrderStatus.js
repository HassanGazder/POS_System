// import { OrderStatusData } from '../../CommonData/Data/index';
import React from "react";
import { Card, CardBody, CardTitle, Col } from "reactstrap";

const OrderStatus = ({
  stats = { pending: 0, completed: 0, cancelled: 0 },
}) => {
  return (
    <React.Fragment>
      <Col>
        <Card style={{ height: "359px" }}>
          {" "}
          {/* Ensure card takes full height */}
          <CardBody>
            <CardTitle>Order Stats</CardTitle>
            <div style={{ flexGrow: 1 }}>
              {" "}
              {/* Ensures the content stretches properly */}
              <ul className="list-unstyled">
                <li className="py-3">
                  <div className="d-flex">
                    <div className="avatar-xs align-self-center me-3">
                      <div className="avatar-title rounded-circle bg-light text-warning font-size-18">
                        <i className="mdi mdi-clock-outline"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <p className="text-muted mb-2">
                        Pending ({stats.pending})
                      </p>
                      <div className="progress progress-sm animated-progess">
                        <div
                          className="progress-bar bg-warning"
                          role="progressbar"
                          style={{ width: `${stats.pendingPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="d-flex">
                    <div className="avatar-xs align-self-center me-3">
                      <div className="avatar-title rounded-circle bg-light text-success font-size-18">
                        <i className="mdi mdi-check-circle-outline"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <p className="text-muted mb-2">
                        Completed ({stats.completed})
                      </p>
                      <div className="progress progress-sm animated-progess">
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: `${stats.completedPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </li>
                <li className="py-3">
                  <div className="d-flex">
                    <div className="avatar-xs align-self-center me-3">
                      <div className="avatar-title rounded-circle bg-light text-danger font-size-18">
                        <i className="mdi mdi-cancel"></i>
                      </div>
                    </div>
                    <div className="flex-grow-1">
                      <p className="text-muted mb-2">
                        Cancelled ({stats.cancelled})
                      </p>
                      <div className="progress progress-sm animated-progess">
                        <div
                          className="progress-bar bg-danger"
                          role="progressbar"
                          style={{ width: `${stats.cancelledPercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  );
};

export default OrderStatus;
