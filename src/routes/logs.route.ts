import { Router } from "express";
import { LogsController } from "../controllers/logs.controller";


export const logsRouter = Router();



logsRouter.get("/logs",LogsController.logscontroller)