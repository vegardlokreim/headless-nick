import express from "express";
import { createOrder, updateOrder, getKlarnaOrder, getWoocommerceOrdersByCustomerId } from "../controllers/orders.js";
import { attatchUserId, authenticateJWT } from "../middleware/auth.js";

const router = express.Router();

router.post("/createOrder", attatchUserId, createOrder);
router.post("/updateOrder", updateOrder);
router.get("/getKlarnaOrder/:id", getKlarnaOrder);
router.get("/getWoocommerceOrdersByCustomerId", authenticateJWT, getWoocommerceOrdersByCustomerId);



export default router;