import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => {
    return res.status(200).json({
        success: true,
        message: "TechBlog API is running ",
    });
});

export { app };