import express from "express";
import { verifyJWTToken } from "../utils";
import { IUser } from "../models/User";

export default (req: any, res: any, next: any) => {

    if (req.path === "/user/login" || req.path === "/user/registration") {
        return next();
    }

    const token = req.headers.token;

    verifyJWTToken(token).then((user: any) => {
        req.user = user;
        next();
    }).catch((err: any) => {
        res.status(403).json({
            message: "Invalid auth token provided."
        })
    })

};
