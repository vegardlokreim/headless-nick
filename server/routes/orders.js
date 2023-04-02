import express from "express";
import { createOrder, updateOrder, getKlarnaOrder } from "../controllers/orders.js";

const router = express.Router();

router.post("/createOrder", createOrder);
router.post("/updateOrder", updateOrder);
router.get("/getKlarnaOrder/:id", getKlarnaOrder);



export default router;