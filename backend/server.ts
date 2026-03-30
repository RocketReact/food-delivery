import express from "express";
import type {Request, Response} from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/lib/db";

dotenv.config();
connectDB().catch((err) => {
    console.error('Failed to connect to DB', err);
})

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Welcome to the server!");
})

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

