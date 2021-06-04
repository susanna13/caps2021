import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";

const app = express();
const port = 3000;

const VERY_SECRET_KEY = "akjngfwoeinoi2n3n2rlk3nlknslf";
app.use(cookieParser(VERY_SECRET_KEY));
app.use(bodyParser.json());

/* await mongoose.connect(
  "mongodb://root:example@localhost/code_academy?authSource=admin",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  }
);
 */
import AuhtController from "./AuthController.js";
import GraphQlController from "./GraphQlController.js";
import SampleController from "./SampleController.js";
import GeoCodingController from "./geocoding/GeoCodingController.js";
import FruitsController from "./fruits/FruitsController.js";

AuhtController(app);
GraphQlController(app);
SampleController(app);
GeoCodingController(app);
FruitsController(app);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});