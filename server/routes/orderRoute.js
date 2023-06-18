import { Router } from "express";
import indexController from "../controllers/indexController";

const route = Router();

route.post("/create", indexController.orderController.createOrder);
route.patch("/update", indexController.orderController.closeOrder);
route.patch("/updateCancel", indexController.orderController.cancelOrder);

export default route;
