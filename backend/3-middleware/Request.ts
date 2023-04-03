import { Request } from "express";
import { UserModel } from "../4-models/UserModel";

export interface MyCustomRequest extends Request {
    user: UserModel;
}