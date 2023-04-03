import { NextFunction, Response } from "express";
import { decode, verify } from "jsonwebtoken";
import { getUser } from "../5-logic/Auth-logic";
import { MyCustomRequest } from "./Request";

const privateKey = 'secret_key_for_signing_jwt_indeed!'


export async function verifyUser(req: MyCustomRequest, res: Response, next: NextFunction) {
    // get token from headers
    const token = req.headers.authorization.substring(7);

    try {
        // get subject from token
        const { sub } = decode(token);

        // get user
        const user = await getUser(+sub);

        // verify token
        verify(token, privateKey);
        req.user = user

        next();
    } catch (e) {
        next(e);
    }
}