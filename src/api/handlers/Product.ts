import { authToken } from "../middlewares/auth";
import { ProductType } from "../interfaces/Product";
import { Product } from "../models/Product";

import { Router, Response, Request } from "express";

const product: Product = new Product();
export const product_Controller: Router = Router();


product_Controller.get("/", async (_: Request, res: Response) => {
    const allProducts: ProductType[] = await product.getProducts();
    return res.json(allProducts);
});

product_Controller.get("/cat/:category", async (req: Request, res: Response) => {
    const category = String(req.params.category);
    const productByCat: ProductType[] = await product.getProductByCat(category);
    return res.json(productByCat);
});
product_Controller.get("/:id", async (req: Request, res: Response) => {
    const productId: number = parseInt(req.params.id);
    const productById: ProductType = await product.getProductById(productId);
    return res.json(productById);
});

product_Controller.delete(
    "/:id",
    authToken,
    async (req: Request, res: Response) => {
        const id: number = parseInt(req.params.id);
        const deletedOrder = await product.deleteProduct(id);
        return res.json(deletedOrder);
    }
);
product_Controller.post("/", authToken, async (req: Request, res: Response) => {
    const createdProduct: ProductType = await product.createProduct(req.body);
    return res.json(createdProduct);
});