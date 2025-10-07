import { NextFunction, Express, Request, Response } from "express";
import { authRouter,commentRouter,postRouter,userRouter } from "./modules";
import { connectDB } from "./DB/connection";
import { AppError } from "./utlis/error";
export function bootstrap(app:Express,express:any){
connectDB(); //operation buffering
//parsing for data
app.use(express.json()); 
//auth
app.use("/auth",authRouter);
//users
app.use("/users",userRouter);
//posts
app.use("/post",postRouter);
//comments
app.use("/comment", commentRouter)
//message
//invalid router
// 404 handler - catch all unhandled routes
app.use("/{*dummy}", (req: Request, res: Response, next: NextFunction) => {
    return res.status(404).json({
        message: "indalid url",
        success: false
    });
});

// Error handler middleware
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.statusCode ).json({
        message:err.message,
        success:false,
        errorDetails:err.errorDetails,
        stack: err.stack,
    });
});
}
