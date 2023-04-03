import { ResultSetHeader } from "mysql2";
import { execute } from "../2-utils/dal";
import { UserModel, UserRole } from "../4-models/UserModel";

export async function register(
  firstname: string,
  lastname: string,
  email: string,
  password: string,
): Promise<UserModel> {
  try {
    const selectQuery = `SELECT * FROM vactions.users WHERE email = '${email}'`;
    const [selectResult] = await execute<UserModel[]>(selectQuery);
    if (selectResult.length > 0) {
      throw new Error('Email already in use');
    }

    const insertQuery = `INSERT INTO vactions.users(firstname, lastname, email, password) VALUES ('${firstname}', '${lastname}', '${email}', '${password}')`;
    const [insertResult] = await execute<ResultSetHeader>(insertQuery);
    const insertedId = insertResult.insertId;
    const user = { id: insertedId, firstname, lastname, email, password };
    return user;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to register user');
  }
}


export async function login(email: string, password: string,): Promise<UserModel> {
    const query = `SELECT * FROM vactions.users where email='${email}' and password='${password}'`;
    const [rows] = await execute<UserModel[]>(query);
    return rows[0];
  }


  export async function getUser(id: number): Promise<UserModel> {
    const query = `SELECT * FROM vactions.users where id = ${id}`;
    const [rows] = await execute<UserModel>(query);
    return rows;
  }

