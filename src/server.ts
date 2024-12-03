import express from "express";
import cors from "cors";
import helmet from "helmet";
import { submitRouter } from "./routes/userSubmit.route";
import requestIp from "request-ip";
import { logsRouter } from "./routes/logs.route";

export const app = express();


app.use(express.json());
app.use(cors());
app.use(helmet());
app.set('trust proxy', true);
app.use(requestIp.mw());




app.use(submitRouter);
app.use(logsRouter)