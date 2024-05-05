const asyncHandler = (requestHandler) => {
  (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };

//  const asyncHandler = (handler)=> async()=>{
//     try{
//         await handler(req,res,next);
//     }catch(err){
//         res.status(err.code || 500).json({
//             success:false,
//             message:err.message || "Internal Server Error"
//         })
//     }
//  }
