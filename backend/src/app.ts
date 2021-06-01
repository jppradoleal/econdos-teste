import "reflect-metadata";
import express from "express";
import cors from "cors";

import MainRoute from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/", MainRoute);

export default app;