import mongoose,{Schema} from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import e from "express";

const userSchema = new Schema({
    nusername:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullName:{
        type:String,
        required:true,
        trim:true,
    },
    avatar:{
        type:String, // we use cloudinary url here
        required:true,
    },
    coverImage:{
        type:String,
    },
    watchHistory:[
        {
            type:SVGAnglechema.Types.objectId,
            ref:'Video'
        }
    ],
    password:{
        type:String,
        required:[true,'Paswword is required']
    },
    refreshToken:{
        type:String
    }
    },{timestamps:true})

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next(); //if password is not modified

    this.password= await bcrypt.hash(this.password,10); //if password is modified
    next();
})

userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function(){
   return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullName : this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    
    }
)
}
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id,
    },
    process.env.REFRESH_tOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    
    }
)
}

export const User= mongoose.model('User',userSchema);