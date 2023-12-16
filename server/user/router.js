const router = require("express").Router();

router.get("/view", (_, res) => {
    res.send("Page with info about the logged user");
});

router.get("/edit", (_, res) => {
    res.send("Page about editing the logged user's info");
});

router.get("/reservations", (_, res) => {
    res.send("Page with info about the logged user's reservations");
});

router.get("/:id", (req, res) => {
    const id = +req.params.id;

    res.send(`Page with info about an user with id ${id}`);
});

router.get("/:id/chat", (req, res) => {
    const id = +req.params.id;

    res.send(`Chat between the logged user and the user with id ${id}`);
});

router.get("/club/view", (_, res) => {
    res.send("Page with info about the logged user's tennis club");
});

router.get("/club/edit", (_, res) => {
    res.send("Page about editing the info of the logged user's tennis club");
});

router.get("/club/reservations", (_, res) => {
    res.send("Page about the reservations in the tennis club of the logged user");
});

module.exports = router;