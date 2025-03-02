import express, { Express } from "express";
import cors from "cors";
import { apiRoutes } from "./api";
const app: Express = express();
const port: number = 8111;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/api", apiRoutes());

app.listen(port, () => console.log(`App listening on port ${port}!`));
