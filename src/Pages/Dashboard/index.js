import React from "react";
import UsePanel from "./UserPanel";
import OrderStatus from "./OrderStatus";
import Notifications from "./Notifications";
import SocialSource from "./SocialSource";
import LatestTransation from "./LatestTransation";
import {useContext} from "react";

import { Row, Container } from "reactstrap";

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb";

// conetext api for dashboard
import { DashboardContext } from "../../Pages/Dashboard/DashboardContext";
const Dashboard = () => {
  const { stats, setStats, transactions, setTransactions } = useContext(DashboardContext);

  document.title = "Dashboard | Oncostele Pharma";
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumbs title="Upzet" breadcrumbItem="Dashboard" />

          {/* User Panel Charts */}
          <UsePanel transactions={transactions} />

          <Row>
            <SocialSource />
          </Row>

          <Row className="mt-4">

            {/* Order Stats */}
            <OrderStatus stats={stats} />
            
            {/* Notifications */}
            <Notifications transactions={transactions} />
          </Row>
          <LatestTransation
            setStats={setStats}
            setTransactions={setTransactions}
          />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
