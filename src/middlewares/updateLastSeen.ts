import express from "express";
import { UserModel } from "../models";

export default (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {

     UserModel.findOneAndUpdate(
     { 
       _id: "60d6390a1d2596120c6e0400" 
     }, 
     { 
       last_seen: new Date() 
     },
     {
       new: true
     },
     () => {})
  next();
};
