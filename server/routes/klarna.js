import express from "express";
const router = express.Router();

import { createOrder, updateOrder } from "../controllers/klarna.js"

router.post("/orders", createOrder)
router.post("/updateOrder/:id", updateOrder);


export default router;