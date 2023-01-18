import { authToken } from "../middlewares/auth";
import { Order } from "../models/Order";
import { Router, Response, Request } from "express";
import { OrderReturnType, OrderType } from "../interfaces/Order";
const order = new Order();
export const order_Controller: Router = Router();


order_Controller.post("/", authToken, async (req: Request, res: Response) => {
    const newOrder: OrderType = await order.createOrder(req.body);
    return res.json(newOrder);
});
order_Controller.get(
    "/:user_id",
    authToken,
    async (req: Request, res: Response) => {
        const userId: number = parseInt(req.params.user_id);
        const currentOrder: OrderReturnType[] = await order.getOrders(userId);
        return res.json(currentOrder);
    }
);
order_Controller.get(
    "/active/:user_id",
    authToken,
    async (req: Request, res: Response) => {
        const userId: number = parseInt(req.params.user_id);
        const activeOrder: OrderReturnType[] =
            await order.getActiveOrdersByUserId(userId);
        return res.json(activeOrder);
    }
);
order_Controller.get(
    "/current/:user_id",
    authToken,
    async (req: Request, res: Response) => {
        const userId: number = parseInt(req.params.user_id);
        const currentOrder: OrderReturnType =
            await order.getCurrentOrderByUserId(userId);
        return res.json(currentOrder);
    }
);
order_Controller.put("/", authToken, async (req: Request, res: Response) => {
    const status = req.query.status as string;
    const orderId = parseInt(req.query.orderId as string);

    if (orderId && ["active", "complete"].includes(status)) {
        const updatedOrder: OrderReturnType = await order.updateOrderStatus(
            status,
            orderId
        );
        return res.json(updatedOrder);
    } else {
        return res.status(400).json({ Error: "Bad parameters" });
    }
});
order_Controller.get(
    "/completed/:user_id",
    authToken,
    async (req: Request, res: Response) => {
        const userId: number = parseInt(req.params.user_id);
        const currentOrder: OrderReturnType[] =
            await order.getCompletedOrdersByUserId(userId);
        return res.json(currentOrder);
    }
);

order_Controller.delete(
    "/:id",
    authToken,
    async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        const deletedOrder: OrderReturnType = await order.deleteOrder(id);
        return res.json(deletedOrder);
    }
);

