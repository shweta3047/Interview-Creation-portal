import * as express from "express";
import controller from "./controller";

export default express
  .Router()
  .post("/adminlogin", controller.adminLogin)
  .post("/adminsignup", controller.adminSignup);
