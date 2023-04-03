import { Router } from "express";
import { generateToken } from "../2-utils/jwt";
import { UserModel } from "../4-models/UserModel";
import { getUser, login, register } from "../5-logic/Auth-logic";

export const AuthRouter = Router();

AuthRouter.post("/register", async (req, res, next) => {
  const user = req.body;
  const registeredUser = await register(user.firstname, user.lastname, user.email, user.password);
  const token = generateToken(registeredUser);

  res.status(201).send(token);
});


AuthRouter.post("/login", async (req, res, next) => {

  const email = req.body.email;
  const password = req.body.password;
  const user = await login(email, password);

  if (!user) {
    next(new Error("The user already exists in the system"));
    return;
  }
  const token = generateToken(user);
  res.status(201).send(token);
});

AuthRouter.get('/getUser/:id', async (req, res, next) => {
  const { id } = req.params
  const getUserById = await getUser(+id);

  res.json(getUserById)
})
