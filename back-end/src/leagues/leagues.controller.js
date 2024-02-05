const service = require("./leagues.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

// Application Middleware/Validators
async function validateLeagueExists(req, res, next) {
    const team = await service.read(req.body.data.teamId);
    if (team) {
      res.locals.league = league;
      return next();
    }
    next({
      status: 404,
      message: `League ID ${req.body.leagueId} cannot be found.`,
    });
}


// RESTful API Functions
async function list(req, res) {
    res.json({ data: await service.list() });
}

// async function read(req, res, next) {
//     console.log(res.locals.homeTeam)
//     res.status(200).json({ data: await service.read(req.body.data.home.teamId) });
// }


module.exports = {
    list: asyncErrorBoundary(list),
    // read: [asyncErrorBoundary(validateTwoTeamsExists), asyncErrorBoundary(read)],
    // addResult: [asyncErrorBoundary(validateTwoTeamsExists), asyncErrorBoundary(addResult)]
};