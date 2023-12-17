const userRouter = require("express").Router();

userRouter.get("/", (_, res) => {
    res.send(`Fetch the information about all users`);
});

userRouter.post("/login", (req, res) => {
    res.send(`Login of a user: ${JSON.stringify(req.body)}`);
});

userRouter.post("/register", (req, res) => {
    res.send(`Registration of a user: ${JSON.stringify(req.body)}`);
});

userRouter.get("/:userId", (req, res) => {
    const userId = +req.params.userId;

    res.send(`Fetch the information about an user with id ${userId}`);
});

userRouter.put("/:userId", (req, res) => { // maybe "patch" instead of "put"?
    const userId = +req.params.userId;

    res.send(`Update the information about an user with id ${userId}: ${JSON.stringify(req.body)}`);
});

userRouter.delete("/:userId", (req, res) => {
    const userId = +req.params.userId;

    res.send(`Delete an user with id ${userId}: ${JSON.stringify(req.body)}`);
});

module.exports = userRouter;