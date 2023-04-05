import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// import woocommerceRouter from "./routes/woocommerce.js"
// import klarnaRouter from "./routes/klarna.js"

import ordersRouter from "./routes/orders.js"
import productsRouter from "./routes/products.js"
import authRouter from "./routes/auth.js"

dotenv.config();
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));
app.use(express.json());

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

app.use("/orders", ordersRouter);
app.use("/auth", authRouter)
app.use("/products", productsRouter);