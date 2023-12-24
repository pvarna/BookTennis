import { Router } from 'express';

export const reservationRouter = new Router()

reservationRouter.post("/", (req, res) => {
    res.send(`Create a new reservation: ${JSON.stringify(req.body)}`);
});

reservationRouter.get("/:reservationId", (req, res) => {
    const reservationId = +req.params.reservationId;

    res.send(`Fetch the informations about a reservation with id ${reservationId}`);
});

reservationRouter.get("/user/:userId", (req, res) => {
    const userId = +req.params.userId;

    res.send(`Fetch the information about all reservations of a user with id ${userId}`);
});

reservationRouter.get("/club/:clubId", (req, res) => {
    const clubId = +req.params.clubId;

    res.send(`Fetch the information about all reservations for a a tennis club with id ${clubId}`);
});

reservationRouter.get("/court/:courtId", (req, res) => {
    const courtId = +req.params.courtId;

    res.send(`Fetch the information about all reservations for a court with id ${courtId}`);
});

reservationRouter.put("/:reservationId", (req, res) => {
    const reservationId = +req.params.reservationId;

    res.send(`Edit the information about a reservation with id ${reservationId}: ${JSON.stringify(req.body)}`);
});

reservationRouter.delete("/:reservationId", (req, res) => {
    const reservationId = +req.params.reservationId;

    res.send(`Delete a reservation with id ${reservationId}: ${JSON.stringify(req.body)}`);
});
