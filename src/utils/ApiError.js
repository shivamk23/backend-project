class ApiError extends Error {
    constructor(
        statusCode,
        message="Something went wrong",
        error=[],
        stack=""
    ){
        super(message);
        this.statusCode=statusCode;
        this.error=error;
        this.stack=stack;
        this.message=message;
        this.success= false

        if(stack){
            this.stack=stack;
        }else{
            Error.captureStackTrace(this,this.contructor)
        }
    }
}

export { ApiError }