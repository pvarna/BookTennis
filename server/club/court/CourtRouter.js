const courtRouter = require("express").Router({mergeParams: true});

courtRouter.get("/", (req, res) => {
    const clubId = +req.params.clubId;
    
    res.send(`Fetch the information about all courts of a tennis club with id ${clubId}`);
});

courtRouter.post("/", (req, res) => {
    const clubId = +req.params.clubId;
    
    res.send(`Create a new court in a tennis club with id ${clubId}: ${JSON.stringify(req.body)}`);
});

courtRouter.get("/:courtId", (req, res) => {
    const clubId = +req.params.clubId;
    const courtId = +req.params.courtId;
    
    res.send(`Fetch the information about a court with id ${courtId} in a tennis club with id ${clubId}`);
});

courtRouter.put("/:courtId", (req, res) => {
    const clubId = +req.params.clubId;
    const courtId = +req.params.courtId;
    
    res.send(`Update the information about a court with id ${courtId} in a tennis club with id ${clubId}: ${JSON.stringify(req.body)}`);
});

courtRouter.delete("/:courtId", (req, res) => {
    const clubId = +req.params.clubId;
    const courtId = +req.params.courtId;
    
    res.send(`Delete a court with id ${courtId} in a tennis club with id ${clubId}: ${JSON.stringify(req.body)}`);
});

module.exports = courtRouter;