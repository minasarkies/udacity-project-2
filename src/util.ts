import cors from "cors";
import jsonwebtoken from "jsonwebtoken";
import express, { Application } from "express";
import { loggerMiddleware } from "./api/middlewares/logger";
import { handleErrors } from "./api/middlewares/handleErrors";
import { requestNotFound404 } from "./api/middlewares/404Request";
import { routes } from "./api/routes/routes";


// eslint-disable-next-line @typescript-eslint/ban-types
export const generateToken: Function = (id: number): string => {
  return jsonwebtoken.sign(id.toString(), process.env.JWT_SECRET as string);
};

export const app: Application = express();
routes(app);

app.use(express.json());
app.use(loggerMiddleware);
app.use(handleErrors);
app.use(requestNotFound404);


const corsOption = {
  optionsSuccessStatus: 200, 
};
app.use(cors(corsOption));
