import jwt from "jsonwebtoken";
import { IUser } from "../models/User";

export default (token: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET || "", (err: any, decodedData: any) => {
      if (err || !decodedData) {
        return reject(err);
      }
      console.log(token)

      resolve(decodedData);
    });
  });
};