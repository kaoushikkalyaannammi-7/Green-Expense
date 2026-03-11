import { useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios";

function Login(){
    const [emailORusername,setEmailORusername]=useState("");
    const [password,setPassword]=useState("");
    const [message,setMessage]=useState("");
    const navigate = useNavigate();
     const handleSubmit=async (e)=>{
        e.preventDefault();
        try{
            const response=await axios.post("http://localhost:5000/api/auth/login",{
                emailORusername,
                password
            });
            const {token,user}=response.data;
            //better if we store the token in local storage along with user details
            localStorage.setItem("token",token);
            localStorage.setItem("user",JSON.stringify(user));
            setMessage("Login Successful!");
            navigate("/home");

        }catch(err){
            if(err.response && err.response.data && err.response.data.message){
                setMessage(err.response.data.message);
            }else{
                console.log(err);
                setMessage("An error occurred during login.");
            }
        

        }

    }
return(
    <div>
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username or Email</label>
                    <input
                    type="text"
                    name="emailORusername"
                    value={emailORusername}
                    placeholder="Enter your username or email"
                    onChange={(e)=>{
                       setEmailORusername(e.target.value)
                    }}
                    required
                    ></input>
                    </div>
                    <div>
                    <label>Password</label>
                    <input
                    type="password"
                    name="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={(e)=>{
                       setPassword(e.target.value)
                    }}
                    required
                    ></input>
                </div>
                <button type="submit">Login</button>
            </form>
            <div><p>{message}</p></div>
            <div>
                <span>Not Registered?</span>
                <button onClick={()=>{navigate("/register")}}>Register here..</button>
                </div>
        </div>
    </div>
);
}
export default Login;