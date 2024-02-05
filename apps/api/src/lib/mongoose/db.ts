import mongoose from "mongoose";

import env from "../../config/env.js";

const mongoUrl = `${env.MONGODB_HOST}:${env.MONGODB_PORT}/${env.MONGODB_DB}`;
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
