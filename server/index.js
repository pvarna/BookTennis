const express = require("express");
var bodyParser = require('body-parser');
const authRouter = require("./auth/AuthRouter");
const userRouter = require("./user/UserRouter");
const clubRouter = require("./club/ClubRouter");

const app = express();
app.use(bodyParser.json())
app.get("/", (_, res) => res.send("Landing page"));

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/club", clubRouter);

app.listen(8080, () => console.log("Server is listening on port 8080"));