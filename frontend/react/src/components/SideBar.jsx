import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import {Menu,House, ChartNoAxesCombined,Wallet,PiggyBank,Bell,CreditCard,Target} from 'lucide-react'
import "./SideBar.css";

function SideBar() {

  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const isIntroPage = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  return (
    <>
      {!(isIntroPage || isLoginPage || isRegisterPage) && (
        <aside className={collapsed ? "sidebar collapsed" : "sidebar"}>

          <button
            className="collapse-btn"
            onClick={() => setCollapsed(!collapsed)}
          >
           <Menu size={22}></Menu>
          </button>

          <NavLink to="/home">
        <House size={20} />
        {!collapsed && <span>Home</span>}
      </NavLink>

      <NavLink to="/dashboard">
        <ChartNoAxesCombined size={20} />
        {!collapsed && <span>Financial Health Dashboard</span>}
      </NavLink>

      <NavLink to="/expenses">
        <Wallet size={20} />
        {!collapsed && <span>Expense Tracking</span>}
      </NavLink>

      <NavLink to="/savings">
        <PiggyBank size={20} />
        {!collapsed && <span>Savings Goal Tracking</span>}
      </NavLink>

      <NavLink to="/bills">
        <Bell size={20} />
        {!collapsed && <span>Automated Bills</span>}
      </NavLink>

      <NavLink to="/debtmanagement">
        <CreditCard size={20} />
        {!collapsed && <span>Debt Management</span>}
      </NavLink>

      <NavLink to="/financialgoal">
        <Target size={20} />
        {!collapsed && <span>Financial Goals</span>}
      </NavLink>

        </aside>
      )}
    </>
  );
}

export default SideBar;