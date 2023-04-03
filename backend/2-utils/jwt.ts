import { UserModel, UserRole } from "../4-models/UserModel";
import { sign } from "jsonwebtoken";


const privateKey = 'secret_key_for_signing_jwt_indeed!'


export function generateToken(user: UserModel) {
  return sign(
    {
      sub: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      password: user.password,
      email: user.email,
      role: user.role,
    },
    privateKey,
    { expiresIn: "2h" }
  );
}
