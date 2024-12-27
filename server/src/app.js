import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(","),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["set-cookie"],
  })
);

app.use(
  express.json({
    limit: "16kb",
  })
);

app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes

import userRouter from "./routes/user.routes.js";
import walletRouter from "./routes/wallet.routes.js";
import budgetRouter from "./routes/budget.routes.js";
import transactionRouter from "./routes/transaction.routes.js";
import goalRouter from "./routes/goal.routes.js";
import analyticsRouter from "./routes/analytics.routes.js";
import errorHandler from "./middlewares/errorHandler.middleware.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/wallet", walletRouter);
app.use("/api/v1/budget", budgetRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/goal", goalRouter);
app.use("/api/v1/analytics", analyticsRouter);

app.use(errorHandler);
export { app };
