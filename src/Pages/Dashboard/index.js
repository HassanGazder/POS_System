import React from "react";
import UsePanel from "./UserPanel";
import OrderStatus from "./OrderStatus";
import Notifications from "./Notifications";
import SocialSource from "./SocialSource";
import OverView from "./OverView";
// import RevenueByLocation from "./RevenueByLocation";
import LatestTransation from "./LatestTransation";
import { useState } from "react";

import { Row, Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

const Dashboard = () => {
  const [stats, setStats] = useState({ pending: 0, completed: 0, cancelled: 0 });
  const [transactions, setTransactions] = useState([]);

  document.title = "Dashboard | Surgical Pos";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Upzet" breadcrumbItem="Dashboard" />
          {/* User Panel Charts */}
          <UsePanel transactions={transactions}/>

          <Row>
            {/* Overview Chart */}
            <OverView />
            {/* Social Source Chart */}
            <SocialSource />
          </Row>

          <Row>
            {/* Order Stats */}
            <OrderStatus stats={stats}/>
            {/* Notifications */}
            <Notifications transactions={transactions}/>
            {/* Revenue by Location Vector Map */}
            {/* <RevenueByLocation /> */}
          </Row>

          {/* Latest Transaction Table */}
          <LatestTransation setStats={setStats} setTransactions={setTransactions}/>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
