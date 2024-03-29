import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// import woocommerceRouter from "./routes/woocommerce.js"
// import klarnaRouter from "./routes/klarna.js"

import ordersRouter from "./routes/orders.js"
import productsRouter from "./routes/products.js"

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));


//TODO: Add middleware and JWT


// app.use("/woocommerce", woocommerceRouter)
// app.use("/klarna", klarnaRouter)

app.use("/orders", ordersRouter);

app.use("/products", productsRouter);