import { Router } from 'express';
import { courtRouter } from '../court/court-router.js';

export const clubRouter = new Router()

clubRouter.use("/:clubId/court", courtRouter);

clubRouter.get("/", (req, res) => {
    res.send("Fetch the information about all tennis clubs");
});

clubRouter.post("/", (req, res) => {
    res.send(`Create a new tennis club: ${JSON.stringify(req.body)}`);
});

clubRouter.get("/:clubId", (req, res) => {
    const clubId = +req.params.clubId;

    res.send(`Fetch the information about a tennis club with id ${clubId}`);
});

clubRouter.put("/:clubId", (req, res) => {
    const clubId = +req.params.clubId;

    res.send(`Update the information about a tennis club with id ${clubId}: ${JSON.stringify(req.body)}`);
});

clubRouter.delete("/:clubId", (req, res) => {
    const clubId = +req.params.clubId;

    res.send(`Delete a tennis club with id ${clubId}: ${JSON.stringify(req.body)}`);
});
