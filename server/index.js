const express = require("express");
var bodyParser = require('body-parser');
const userRouter = require("./user/UserRouter");
const clubRouter = require("./club/ClubRouter");
const reservationRouter = require("./reservation/ReservationRouter");
const chatRouter = require("./chat/ChatRouter");
const port = 8080;

const app = express();
app.use(bodyParser.json())
app.get("/", (_, res) => res.send("Hello from the Express server!"));

app.use("/user", userRouter);
app.use("/club", clubRouter);
app.use("/reservation", reservationRouter);
app.use("/chat", chatRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}`));