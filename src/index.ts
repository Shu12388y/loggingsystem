import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});

import cluster from "cluster";
import os from "os";
import { app } from "./server";
import { connectDB } from "./services/db.services";

if (cluster.isPrimary) {
  const numsCpu = os.cpus().length;
  console.log(numsCpu)

  for (let i = 0; i < numsCpu; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {});
  console.log("Starting a new worker");
  cluster.fork();
} else {
  connectDB().then(()=>{
    app.listen(process.env.PORT);
  }).catch((e)=>{
    console.log(e)
  })
}
