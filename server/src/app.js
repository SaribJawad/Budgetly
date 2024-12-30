import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       console.log("Origin:", origin);
//       // Allow requests with no origin (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg =
//           "The CORS policy for this site does not allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "X-Requested-With",
//       "Accept",
//     ],
//     exposedHeaders: ["set-cookie"],
//   })
// );

// Add a preflight handler for OPTIONS requests
app.options("*", cors());

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
