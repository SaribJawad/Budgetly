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
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MONGODB connection failed!", error);
  });

export const handler = serverless(app);
