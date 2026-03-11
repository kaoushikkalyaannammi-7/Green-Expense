import NavBar from './NavBar';
import { useLocation } from 'react-router-dom';
import './Header.css';

function Header(){
    const location=useLocation();

    const isLoginPage=location.pathname==="/login";
    const isRegisterPage=location.pathname==="/register";
    return(
        <header className='header'>

            <div className="header-container">
                
                    <img src="/Greenexpense2.png" alt="Green Expense Logo" className='logo-img'/>
                    <strong className='logo-text'>Green Expense</strong>
                
                <div>
                    {!(isLoginPage || isRegisterPage )&& <NavBar />}
                </div>

            </div>

        </header>
         
    );
}

export default Header;