import express from "express";
import { getUser } from "../controllers/users.js";
import { authenticateJWT } from "../middleware/auth.js";
const router = express.Router();

router.get("/", authenticateJWT, getUser);

export default router;