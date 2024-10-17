import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
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
import walletRouter from "./routes/wallet.route.js";
import budgetRouter from "./routes/budget.routes.js";
import transactionRouter from "./routes/transaction.route.js";
import goalRouter from "./routes/goal.routes.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/wallet", walletRouter);
app.use("/api/v1/budget", budgetRouter);
app.use("/api/v1/transaction", transactionRouter);
app.use("/api/v1/goal", goalRouter);

export { app };
