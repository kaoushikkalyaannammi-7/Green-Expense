import { NavLink } from "react-router-dom";
import './NavBar.css';
function NavBar(){
    return(
        <div className="navbar">
           <NavLink to="/home">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/help">Help</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <NavLink to="/settings">Settings</NavLink>
            
        </div>
    );
}
export default NavBar;