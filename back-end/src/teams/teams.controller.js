const service = require("./teams.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

// Application Middleware/Validators
async function validateTeamExists(req, res, next) {
    const team = await service.read(req.body.data.teamId);
    if (team) {
      res.locals.team = team;
      return next();
    }
    next({
      status: 404,
      message: `Team ID ${req.body.teamId} cannot be found.`,
    });
}

async function validateTwoTeamsExists(req, res, next) {
    const homeTeam = await service.read(req.body.data.home.teamId);
    const awayTeam = await service.read(req.body.data.away.teamId);
    if (homeTeam && awayTeam) {
      res.locals.homeTeam = homeTeam;
      res.locals.awayTeam = awayTeam;
      return next();
    }
    next({
      status: 404,
      message: `Team ID ${req.body.data.home.teamId} or ${req.body.data.away.teamId} cannot be found.`,
    });
}

// RESTful API Functions
async function list(req, res) {
    res.json({ data: await service.list() });
}

async function read(req, res, next) {
    console.log(res.locals.homeTeam)
    res.status(200).json({ data: await service.read(req.body.data.home.teamId) });
}

async function addResult(req, res, next){
    //refactor necessary data
    const newHomeData = req.body.data.home;
    const newAwayData = req.body.data.away;
    const currentHomeData = res.locals.homeTeam;
    const currentAwayData = res.locals.awayTeam;
    const homeId = currentHomeData.teamId;
    const awayId = currentAwayData.teamId

    // Update the result arrays by pushing new results in
    currentHomeData.results.push(newHomeData.result)
    currentAwayData.results.push(newAwayData.result)

    // Update goals scored and goals conceded for home team
    currentHomeData.goalsFor += newHomeData.goalsScored;
    currentHomeData.goalsAgainst += newHomeData.goalsConceded;

    // Update goals scored and goals conceded for away team
    currentAwayData.goalsFor += newAwayData.goalsScored;
    currentAwayData.goalsAgainst += newAwayData.goalsConceded;

    //Update both teams data in the database
    await service.update(homeId, currentHomeData);
    await service.update(awayId, currentAwayData);

    //read updated data, and send back as response
    const updatedHome = await service.read(currentHomeData.teamId)
    const updatedAway = await service.read(currentAwayData.teamId)
    const data = {
        home: updatedHome,
        away: updatedAway
    }
    res.status(200).json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(validateTwoTeamsExists), asyncErrorBoundary(read)],
    addResult: [asyncErrorBoundary(validateTwoTeamsExists), asyncErrorBoundary(addResult)]
};