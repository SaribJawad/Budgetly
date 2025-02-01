import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";
import "./utils/budgetCleaner.js";
import serverless from "serverless-http";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR: ", error);
      throw error;
    });
    // app.listen(process.env.PORT || 3000, () => {
    //   console.log(`Server is running at port: ${process.env.PORT}`);
    // });
  })
  .catch((error) => {
    console.log("MONGODB connection failed!", error);
  });

export const handler = serverless(app);

// let isDBConnected = false;

// // Connect to DB and set up handler
// const startServer = async () => {
//   try {
//     await connectDB();
//     isDBConnected = true;
//     console.log("MongoDB connected!");
//   } catch (error) {
//     console.log("MONGODB connection failed!", error);
//     process.exit(1); // Exit if DB connection fails
//   }
// };

// // Initialize server
// startServer();

// // Export handler with DB connection check
// export const handler = serverless(app, {
//   request: (request, event, context) => {
//     if (!isDBConnected) {
//       throw new Error("Database not connected!");
//     }
//     return request;
//   },
// });
