import React, { useEffect, useState } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";

import RadialChart1 from "./userpanelChart1";
import RadialChart2 from "./userpanelChart2";
import RadialChart3 from "./userpanelChart3";

const UserPanel = ({ transactions }) => {
  const [userPercentage, setUserPercentage] = useState(0);
  const [ordersPerMinute, setOrdersPerMinute] = useState(0);
  const [percentageOfUsers, setPercentageOfUsers] = useState(0);
  const [newVisitors, setNewVisitors] = useState(0);

  useEffect(() => {
    const totalOrders = transactions.length;
    const completedOrders = transactions.filter(
      (t) => t.status === "completed"
    ).length;
    const pendingOrders = transactions.filter(
      (t) => t.status === "pending"
    ).length;

    // Users Completion Percentage (Completed Orders / Total Orders)
    const calculatedUserPercentage =
      totalOrders > 0 ? (completedOrders / totalOrders) * 100 : 0;
    setUserPercentage(calculatedUserPercentage);

    // Orders Per Minute (Assume 1 order every 10 minutes as a basic logic)
    setOrdersPerMinute(totalOrders > 0 ? totalOrders / 10 : 0);

    // Percentage of Users who did not complete a transaction
    const calculatedPercentageOfUsers =
      totalOrders > 0 ? (pendingOrders / totalOrders) * 100 : 0;
    setPercentageOfUsers(calculatedPercentageOfUsers);

    // New Visitors (For now, assuming new visitors are pending orders)
    setNewVisitors(totalOrders > 0 ? pendingOrders : 0);
  }, [transactions]);

  return (
    <React.Fragment>
      <Row>
        {/* Total Users */}
        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <RadialChart1 percentage={userPercentage} />
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Users</p>
                  <h5 className="mb-3">{transactions.length}</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Orders Per Minute / Hour */}
        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <RadialChart2 percentage={ordersPerMinute} />
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Orders Per Minute</p>
                  <h5 className="mb-3">{ordersPerMinute.toFixed(2)}</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* Percentage of Users who visit but don’t complete a transaction */}
        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <RadialChart3 percentage={percentageOfUsers} />
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">Percentage of Users</p>
                  <h5 className="mb-3">{percentageOfUsers.toFixed(2)}%</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>

        {/* New Visitors */}
        <Col xl={3} sm={6}>
          <Card>
            <CardBody>
              <div className="d-flex text-muted">
                <div className="flex-shrink-0 me-3 align-self-center">
                  <div className="avatar-sm">
                    <div className="avatar-title bg-light rounded-circle text-primary font-size-20">
                      <i className="ri-group-line"></i>
                    </div>
                  </div>
                </div>
                <div className="flex-grow-1 overflow-hidden">
                  <p className="mb-1">New Visitors</p>
                  <h5 className="mb-3">{newVisitors.toFixed(2)}</h5>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default UserPanel;
