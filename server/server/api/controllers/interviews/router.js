import * as express from "express";
import controller from "./controller";
import isAdmin from "../../middlewares/isAdmin";

export default express
  .Router()
  .get("/upcoming", controller.upcomingInterview)
  .post("/schedule", controller.scheduleInterview)
  .put("/edit/:id", controller.editInterview)
  .delete("/delete/:id", controller.deleteInterview);
