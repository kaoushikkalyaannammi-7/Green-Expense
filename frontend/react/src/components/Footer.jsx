import './Footer.css';
function Footer(){
    let year=new Date().getFullYear();
    return (
        <footer>
            <div>
                <div>GreenExpense</div>
                <div>&copy; {year} All rights reserved.</div>
            </div>
        </footer>
    );
}

export default Footer;