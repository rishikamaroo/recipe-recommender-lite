import express, { Request, Response, NextFunction } from "express";
import todoRoutes from "./routes/todos";
import { json } from "body-parser";
import mongoose, { ConnectOptions } from "mongoose";

mongoose.connect(
  "mongodb://localhost:27017/todo",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions,
  () => {
    console.log("*** 1 connected to database");
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("**** 2 connected to database");
});

const app = express();
app.use(json());
app.use("/todos", todoRoutes);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});
app.listen(3000);
