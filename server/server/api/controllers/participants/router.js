import * as express from "express";
import controller from "./controller";

export default express
  .Router()
  .get("/interviewees", controller.allInterviewees)
  .get("/interviewers", controller.allInterviewers);
