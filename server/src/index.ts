import { serve } from "@hono/node-server";
import { Hono } from "hono";
import dotenv from "dotenv";
import { connectDB } from "./DB";

dotenv.config({
  path: "./.env",
});

const app = new Hono();

connectDB()
  .then(() => {
    app.onError((err, c) => {
      console.log("ERROR: ", err);
      return c.text("Something went wrong", 500);
    });

    const port = Number(process.env.PORT) || 8000;
    serve({
      fetch: app.fetch,
      port,
    });

    console.log(`Server is running at port: ${port}`);
  })
  .catch((error) => {
    console.log("MongoDB connection failed!", error);
  });

app.get("/", (c) => {
  return c.text("Hello Hono cpnnected DB!");
});
