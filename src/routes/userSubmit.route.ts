import { Router } from "express";
import { UserSubmitController } from "../controllers/userSubmit.controller";
import { logChecker } from "../middleware/log.middleware";

export const submitRouter = Router();


submitRouter.post("/api/submit",logChecker,UserSubmitController.userSubmitController);