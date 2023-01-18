import { User } from "../models/User";
import { authToken } from "../middlewares/auth";
import { UserReturnType, UserCreatedReturnType } from "../interfaces/User";
import { Router, Request, Response } from "express";
const user: User = new User();

export const user_Controller: Router = Router();

user_Controller.post("/", authToken, async (req: Request, res: Response) => {
    const newUser: UserCreatedReturnType = await user.createUser(req.body);
    return res.json(newUser);
});
user_Controller.get("/", authToken, async (_: Request, res: Response) => {
    const allUsers: UserReturnType[] = await user.getUsers();
    return res.json(allUsers);
});

user_Controller.delete(
    "/:id",
    authToken,
    async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        const deletedOrder: UserReturnType = await user.deleteUser(id);
        return res.json(deletedOrder);
    }
);
user_Controller.get("/:id", authToken, async (req: Request, res: Response) => {
    const userId: number = parseInt(req.params.id);
    const allUsers: UserReturnType = await user.getUserById(userId);
    return res.json(allUsers);
});
