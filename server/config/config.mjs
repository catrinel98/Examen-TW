import dotenv from "dotenv";

// load the dotenv file
dotenv.config({ path: "./config/.env" });

export const EXPRESS_CONFIG = {
  env: process.env.NODE_ENV || "development",
  host: process.env.HOST || "localhost",
  port: process.env.PORT || 8080,
  mongoUri:
    process.env.MONGO_URI ||
    "mongodb+srv://Rebeca:RebecaRebecaRebeca@cluster.ehzq4.mongodb.net/cluster?retryWrites=true&w=majority",
};
