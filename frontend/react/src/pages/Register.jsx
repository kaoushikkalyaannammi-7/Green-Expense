import { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
function Register(){
    const [username, setUsername] = useState("");
    const [email,setEmail]=useState("");
    const [contact,setContact]=useState("");
    const [password,setPassword]=useState("");
    const [message,setMessage]=useState("");
const navigate=useNavigate();
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const response=await axios.post("http://localhost:5000/api/auth/register",{
                username,
                email,
                contact,
                password

         } );
            setMessage("Registration Successful! Please login.:");
            navigate("/login");

        }catch(err){
            if(err.response && err.response.data && err.response.data.message){
                setMessage(err.response.data.message);
            }else{
                console.log(err);
                setMessage("An error occurred during registration.");
            }
        }
    }

    return(
        <div>
            <div>
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="username">Username</label>
                        <input type="text" 
                        id="username" 
                        name="username"
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}
                         required />
                    </div>
                    <div>
                        <label htmlFor="email">Email</label>
                        <input
                         type="email" 
                         name="email"
                         id="email"
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="contact">Contact</label>
                        <input
                         type="text" 
                         name="contact"
                         id="contact"
                            value={contact}
                            onChange={(e)=>{setContact(e.target.value)}}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                         type="password" 
                         name="password"
                         id="password"
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            required
                        />
                    </div>
                    <button type="submit">Register</button>
                </form>
                <div><p>{message}</p></div>
                <div>
                    <span>Already have an account?</span>
                    <button onClick={()=>{navigate('/login')}}>Login here...</button>
                </div>

            </div>
        </div>
    );
}

export default Register;