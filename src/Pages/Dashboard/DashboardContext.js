import React, { createContext, useState } from "react";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [stats, setStats] = useState({
    pending: 0,
    completed: 0,
    cancelled: 0,
  });

  const [transactions, setTransactions] = useState([]);
  const [purchases, setPurchases] = useState([]);

  return (
    <DashboardContext.Provider value={{ stats, setStats, transactions, setTransactions,purchases, setPurchases }}>
      {children}
    </DashboardContext.Provider>
  );
};
