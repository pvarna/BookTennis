const authRouter = require("express").Router();

authRouter.post("/login", (req, res) => {
    res.send(`Login of a user: ${JSON.stringify(req.body)}`);
});

authRouter.post("/register", (req, res) => {
    res.send(`Registration of a user: ${JSON.stringify(req.body)}`);
});

module.exports = authRouter;