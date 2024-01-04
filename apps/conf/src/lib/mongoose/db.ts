import mongoose from "mongoose";

import { config } from "../../config/config.js";

const mongoUrl = `${config.MONGODB_HOST}:${config.MONGODB_PORT}/${config.MONGODB_DB}`;
const mongooseConnectionOptions: mongoose.ConnectOptions = {};

const mongoConnection = mongoose.connection;

const connect = () =>
  new Promise<boolean>((resolve, reject) => {
    mongoose.connect(mongoUrl, mongooseConnectionOptions);

    mongoConnection.on("error", (error) => {
      console.log(`MongoDB connection error: ${error}`);
      reject(false);
    });

    mongoConnection.once("open", () => {
      console.log("MongoDB connection success");
      resolve(true);
    });
  });

export { connect };
export default mongoConnection;
