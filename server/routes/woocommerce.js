import express from "express";
import { createOrder, getProduct, getProducts } from "../controllers/woocommerce.js";
const router = express.Router();

router.get("/products", getProducts);
router.get("/products/:id", getProduct);
router.post("/orders", createOrder);


export default router;
