import { Application, Router } from "express";

import { product_Controller } from "../handlers/Product";
import { user_Controller } from "../handlers/User";
import { order_Controller } from "../handlers/Order";

const _routes: [string, Router][] = [
    ["/products", product_Controller],
    ["/users", user_Controller],
    ["/orders", order_Controller],
];

// eslint-disable-next-line @typescript-eslint/ban-types
export const routes: Function = (app: Application): void => {
  _routes.forEach((route) => {
    const [url, controller] = route;
    app.use(url, controller);
  });
};
