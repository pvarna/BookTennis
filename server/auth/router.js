const router = require("express").Router();

router.get("/login", (_, res) => {
    res.send("Login page");
});

router.get("/register", (_, res) => {
    res.send("Resgistration page");
});

module.exports = router;