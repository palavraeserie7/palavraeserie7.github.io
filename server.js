import express from "express";
import cors from "cors";

import m00 from "./routes/m00.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/m00", m00);

app.listen(3000, () => {

    console.log("M00 ONLINE");

});
