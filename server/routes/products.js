import express from "express";
import { getWoocommerceProduct, getWoocommerceProducts } from "../controllers/products.js";
const router = express.Router();

router.get("/", getWoocommerceProducts);
router.get("/:id", getWoocommerceProduct);

export default router;