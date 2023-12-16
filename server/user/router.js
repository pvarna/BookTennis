const router = require("express").Router();

router.get("/view", (_, res) => {
    res.send("Page with info about the logged user");
});

router.get("/:id", (_, res) => {
    res.send(`Page with info about a tennis club with id ${id}`);
});

module.exports = router;