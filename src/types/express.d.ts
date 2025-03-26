import { Request } from "express";
import { Document } from "mongoose";
import { IUser } from "./index";

declare module "express" {
  export interface Request {
    user?: IUser
  }
}