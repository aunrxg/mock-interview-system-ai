import { Request } from "express";
import { Document } from "mongoose";
import { IUser } from "../models/user.model";


declare module "express" {
  export interface Request {
    user?: IUser
  }
}