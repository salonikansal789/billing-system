import { Router } from "express";

class UserRoutes {
  public route =  Router();
  constructor() {
    this.initilaze();
  }
  public initilaze() {
    this.route.get("/", login);
  }
}

export default new UserRoutes();