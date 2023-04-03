import { NextFunction, Response } from "express";
import { UserRole } from "../4-models/UserModel";
import { MyCustomRequest } from "./Request";

export function checkAdmin(req: MyCustomRequest, res: Response, next: NextFunction) {
    if (req?.user?.role === UserRole.ADMIN) next();
    else next(new Error('not admin'));
}