import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import User from '../models/User.js';

//register a new user;
export const register=async(req,res)=>{
    try{
        //nothing to do much just take the req body and create a new user
        const {username,email,contact,password}=req.body;
    
        //checks whether the user already exists
    const existingUser=await User.findOne({$or:[{email},{username}]})

if(existingUser){
    return res.status(400).json({message:"User with given email or username already exists"});
}

//hash the password
const salt=await bcrypt.genSalt(10);
const hashedPassword=await bcrypt.hash(password, salt);

const newUser=await User.create(
    {
        username,
        email,
        contact,
        password:hashedPassword
    }
)

res.status(201).json({message:'user registered successfully'});

}catch(err){
    console.log("error in finding existing user during registration:"+ err.message);
    return res.status(500).json({message:"Server error"});
}
}
//login an existing user
export const login=async(req,res)=>{
//take the req body and find the user
try{
    const {emailORusername,password}=req.body;
    //check whether the user exists
    const user=await User.findOne({$or:[{email:emailORusername},{username:emailORusername}]});
    if(!user){
        return res.status(400).json({message:"user does not exist"});
    }
    //compare passwords
    
    const isMatch=await bcrypt.compare(password, user.password);
   
    if(!isMatch){
        return res.status(401).json({message:"Invalid Password"});
    }

    //generate jwt token
    const token=jwt.sign(
        {
            userId:user._id,
        },
        process.env.JWT_SECRET,
        {expiresIn:'1d'}
    );

    return res.status(200).json(
        {
            token,
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
                contact:user.contact
            }
        }
    )

}catch(err){
    console.log("error in user login:"+ err.message);
    return res.status(500).json({message:"Server error"});
}

}