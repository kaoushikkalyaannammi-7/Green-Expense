import {useNavigate} from "react-router-dom";
import React from "react";
import {useEffect} from "react";
import"./Intro.css";
function Intro(){
    const navigate = useNavigate();

    useEffect(()=>{
        const timer=setTimeout(()=>{
            navigate("/login");
        },5000);

        return()=>clearTimeout(timer);
    },[navigate]);



    return(
        <div className="intro-container">
      {/* Change className to switch animation */}
      {/* <h1 className="title trees-text">Green Expense</h1> */}
      <h1 className="title graph-text">Green Expense</h1>

      <h3 className="tagline">Smart money. Smarter decisions</h3>
    </div>
    );
}
export default Intro;