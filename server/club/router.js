const router = require("express").Router();

router.get("/:id", (_, res) => {
    const id = +req.params.id;

    res.send(`Page with info about a tennis club with id ${id}`);
});

router.get("/:id/courts", (_, res) => {
    const id = +req.params.id;

    res.send(`Page with info about the courts of a tennis club with id ${id}`);
});

module.exports = router;