import express from "express";
import { authCheck, login, logout } from "../controllers/auth.js";
import { authenticateJWT } from "../middleware/auth.js";
const router = express.Router();

router.get('/logout', logout);

router.post('/login', login);

router.get('/auth-check', authenticateJWT, authCheck);


export default router;