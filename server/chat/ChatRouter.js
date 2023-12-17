const chatRouter = require("express").Router();

chatRouter.get("/user1/:userId1/user2/:userId2", (req, res) => {
    const userId1 = +req.params.userId1;
    const userId2 = +req.params.userId2;

    res.send(`Fetch the chat information between user with id ${userId1} and user with id ${userId2}`);
});

chatRouter.post("/user1/:userId1/user2/:userId2", (req, res) => {
    const userId1 = +req.params.userId1;
    const userId2 = +req.params.userId2;

    res.send(`Add a new message between in the chat between the user with id ${userId1} and the user with id ${userId2}: ${JSON.stringify(req.body)}`);
});

module.exports = chatRouter;