import mysql, { RowDataPacket } from "mysql2";

const pool = mysql.createPool({
  host: "127.0.0.1",
  user: "root",
  password: "dedidedi123",
  port: 3306,
  database: "vactions",
});

export function execute<T>(query: string, params?: any[]) {
  return pool.promise().execute<T & RowDataPacket[]>(query, params);
}
