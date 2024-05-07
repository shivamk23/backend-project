import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/apiError.js";


export const verifyJWT = asyncHandler(async(req,_,next)=>{
    //get token from cookie
    //verify token
    //set user in req object
    //call next
    
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
        if(!token){
            throw new ApiError(401,"Unauthorized request");
        }
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
    
        if(!user){
            // discuss about frontend handling of this error
            throw new ApiError(401,"Invalid Access Token ");
        }
    
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401,error.message || "Invalid Access token");
    }

    
})