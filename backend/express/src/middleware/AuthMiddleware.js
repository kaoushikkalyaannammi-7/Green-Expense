import jwt from 'jsonwebtoken';

//middleware to verify jwt token
export const protect=async(req,res,next)=>{
    

    let token;
    //header lo authorization section unte andhulo bearer tho start aithe token extract cheyyali
    if(req.headers.authorization && req.headers.authorization.startsWith(`Bearer`)){
        token=req.headers.authorization.split(' ')[1];
    }
    if(!token){
        return res.status(401).json({message:"Not authorized, no token"});
    }
    // console.log("JWT_SECRET IN MIDDLEWARE:", process.env.JWT_SECRET);

    try{
        

        const decoded=jwt.verify(token, process.env.JWT_SECRET);
       
        req.user=decoded.userId;

        next();
    }
    catch(err){
        console.log("error in auth middleware:"+ err.message);
        return res.status(500).json({message:"Server error"});
    }
};