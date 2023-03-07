require("dotenv").config();

import express from "express";
import catRouter from "./routes/cat.router";

const port = process.env.PORT || 3000;

const app = express();
app.use(express.urlencoded({extended: false}));
app.use(express.json())

const router = express.Router();
app.use("/api/v1", router)
router.use("/cats", catRouter)

app.listen(port, () => console.log(`Server listening on port: ${port}`))
