import Express from "express";
import { router } from "./router";

export const app = Express();
app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

app.use("/SICEI", router);
