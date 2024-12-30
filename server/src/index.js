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

// export const handler = serverless(app);

// Handler for AWS Lambda
export const handler = async (event, context) => {
  // Keep the database connection alive between Lambda invocations
  context.callbackWaitsForEmptyEventLoop = false;

  // Connect to database if not already connected
  if (!global.mongooseConnection) {
    await connectToDatabase();
  }

  // Create the proxy handler
  const handler = serverless(app);

  // Handle the request
  return await handler(event, context);
};

// Only start the express server if we're running locally
if (process.env.NODE_ENV === "development") {
  connectToDatabase().then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  });
}
