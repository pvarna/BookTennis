const express = require("express");
var bodyParser = require('body-parser');
const authRouter = require("./auth/router");
const userRouter = require("./user/router");

const app = express();
app.use(bodyParser.json())
app.get("/", (_, res) => res.send("Landing page"));

app.use("/auth", authRouter);
app.use("/user", userRouter);

app.listen(8080, () => console.log("Server is listening on port 8080"));