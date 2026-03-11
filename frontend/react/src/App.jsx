import { useState } from 'react'
import './Layout.css';
import {Routes,Route} from 'react-router-dom'
import {useLocation} from 'react-router-dom';
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import SideBar from './components/SideBar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Intro from './pages/Intro.jsx'
import Header from './components/Header.jsx';
import DashBoard from './pages/DashBoard.jsx'
import Expenses from './pages/Expenses.jsx'
import Savings from './pages/Savings.jsx'
import Bills from './pages/Bills.jsx'
import DebtManagement from './pages/DebtManagement.jsx'
import FinancialGoal from './pages/FinancialGoal.jsx'
import About from './pages/HeaderPages/About.jsx';
import Contact from './pages/HeaderPages/Contact.jsx';
import Help from './pages/HeaderPages/Help.jsx';
import Profile from './pages/HeaderPages/Profile.jsx';
import Settings from './pages/HeaderPages/Settings.jsx';


function App() {

  const location = useLocation(); 
  const isIntroPage = location.pathname === "/";

  return (
    <div className="app-container">

      {!isIntroPage && <Header />}

      <div className="app-layout"> 

        <SideBar />

        <div className="app-content">
          <Routes>
            <Route path="/" element={<Intro/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/dashboard" element={<DashBoard/>}/>
            <Route path="/expenses" element={<Expenses/>}/>
            <Route path="/savings" element={<Savings/>}/>
            <Route path="/bills" element={<Bills/>}/>
            <Route path="/debtmanagement" element={<DebtManagement/>}/>
            <Route path="/financialgoal" element={<FinancialGoal/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>
            <Route path="/help" element={<Help/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/settings" element={<Settings/>}/>
          </Routes>
        </div>

      </div>

      {!isIntroPage && <Footer />}

    </div>
  );
}

export default App;