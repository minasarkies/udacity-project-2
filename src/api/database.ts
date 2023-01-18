import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

interface parseErrorTypes {
  [code: string]: string;
}
console.log("ENV: ", process.env.ENV);
export const pool: Pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string),
  database:
    process.env.ENV === "test"
      ? process.env.DB_NAME_TEST
      : process.env.DB_NAME,
});
/* This function was inspired from another repo and the error codes from 
 https://www.postgresql.org/docs/current/errcodes-appendix.html */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const parseError = (err: NodeJS.ErrnoException) => {
  const errorCodes: parseErrorTypes = {
    "42501": "permission_denied",
    "08003": "connection_does_not_exist",
    "08006": "connection_failure",
    "42601": "syntax_error",
    "42602": "invalid_name",
    "42622": "name_too_long",
    "42939": "reserved_name",
    "42703": "undefined_column",
    "42P01": "undefined_table",
    "57P03": "cannot_connect_now",
    "42P02": "undefined_parameter",
  };
  if (err !== undefined) {
      if (err.message !== undefined) {
          console.log("ERROR message:", err.message);
      }

      if (err.code !== undefined) {
          console.log("Postgres error code:", err.code);

          if (errorCodes[err.code] !== undefined) {
              console.log("Error code details:", errorCodes[err.code]);
          }
      }

      if (err.code === undefined) {
          console.log("Unknown Postgres error:", err);
      }
  }
};