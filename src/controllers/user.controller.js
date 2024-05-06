import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/apiError.js';
import {User} from '../models/user.model.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResponse.js';
const registerUser= asyncHandler(async(req,res)=>{
    //get user details from frontend 
    //validation - not empty
    //checl if user already exists
    //check for images, check for avatar
    //upload them to cloudinary, avatar
    //create user object - create entry in db 
    //remove password and refresh token from user field from response
    //check for user creation 
    //return response

    //get user details from frontend
    const {fullName,email,username,password}=req.body;
    console.log(fullName,email,password,username);

    if ([fullName, email, username, password].some(field => !field || !field.trim())) {
        throw new ApiError(400, "All fields are required");
    }

    const exixtedUser = await User.findOne({
        $or:[{email},{username}]
    })

    if(exixtedUser){
        throw new ApiError(400,"User or email already exists")
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage>0){
        coverImageLocalPath = req.files.coverImage[0].path;
    }

    if(!avatarLocalPath){
        throw new ApiError(400,"Avatar is required")
    }

    //upload them to cloudinary, avatar
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage= await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new ApiError(400,"Avatar upload failed")
    }

    //create user object - create entry in db
    const user = await User.create({
        fullName,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        password,
        username:username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken") //remove password and refresh token from user field from response


    if(!createdUser){
        throw new ApiError(500,"User creation failed ")
    }

    return res.status(201).json(
        new ApiResponse(200,createdUser,"User created successfully")
    )

})

export {registerUser}