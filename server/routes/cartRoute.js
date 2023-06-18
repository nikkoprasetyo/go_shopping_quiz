import { Router } from "express";
import indexController from "../controllers/indexController";

const route = Router();

route.post("/add", indexController.cartController.addToCart);

export default route;
