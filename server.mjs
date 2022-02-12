import { EXPRESS_CONFIG as config } from "./config/config.mjs";
import mongoose from "mongoose";
import app from "./express.mjs";

mongoose.connect(config.mongoUri);
const db = mongoose.connection;
db.on("error", (err) => {
  console.log(err);
});
db.once("open", () => {
  console.log("Conectat la MongoDB Atlas");
});

app.listen(config.port, (err) => {
  if (err) {
    console.log(err);
  }

  console.info(
    "Back-end pornit in modul %s  pe %s:%d.",
    config.env,
    config.host,
    config.port
  );
});
