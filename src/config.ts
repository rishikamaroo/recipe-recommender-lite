const dotenv = require("dotenv");
dotenv.config();

export const MONGO_CONNECT_URL =
  process.env.MONGO_CONNECT_URL || "mongodb://localhost:27017";
export const PORT = process.env.PORT || 3000;
