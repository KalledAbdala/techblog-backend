import express from "express";
import cors from "cors";

import { router } from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health Check
app.get("/health", (_, res) => {
return res.status(200).json({
    success: true,
    message: "TechBlog API is running",
});
});

// Rotas da API
app.use(router);

app.use(errorMiddleware);

export { app };