const router = require("express").Router();

router.get("/register", (_, res) => {
    res.send("Page for registration of a new tennis club");
});

router.get("/:id/courts", (req, res) => {
    const id = +req.params.id;
    
    res.send(`Page with info about the courts of a tennis club with id ${id}`);
});

router.get("/:id", (req, res) => {
    const id = +req.params.id;

    res.send(`Page with info about a tennis club with id ${id}`);
});

module.exports = router;