import express, { Request, Response, NextFunction } from "express";
import AppError from "./utils/appError";
import globalErrorHandler from "./controllers/errorController";
import messageRouter from "./routes/messageRoute";
import categoryRouter from "./routes/categoryRoute";
import userRouter from "./routes/userRoute";
import cors from 'cors';

const app = express();

// Add this before your routes
app.use(cors());
app.use(express.json({ limit: "10kb" }));

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

// Notify users to use the frontend entry point
app.get("/", (req: Request, res: Response) => {
  res.status(200).send(`
    <h1>Welcome to MessageHub API Developed by Mulugeta Linger!</h1>
    <p>Please visit our frontend application at <a href="https://vermillion-hotteok-6aed50.netlify.app/" target="_blank">https://vermillion-hotteok-6aed50.netlify.app/</a> to use the full application.</p>
    <p>API Documentation is available at the respective endpoints:</p>
    <ul>
      <li><a href="/api/v1/messages">Messages API</a></li>
      <li><a href="/api/v1/categories">Categories API</a></li>
      <li><a href="/api/v1/users">Users API</a></li>
    </ul>
  `);
});

// 2) Routes
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/users", userRouter);

// Handling unhandled routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalErrorHandler);

// Export the app for use in other files
export default app;
