const service = require("./seasons.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

// Application Middleware/Validators
async function validateSeasonExists(req, res, next) {
    const season = await service.read(req.body.data.id);
    if (season) {
      res.locals.team = season;
      return next();
    }
    next({
      status: 404,
      message: `Season ID ${req.body.id} cannot be found.`,
    });
}

// RESTful API Functions
async function list(req, res) {
    res.json({ data: await service.list() });
}

async function read(req, res, next) {
    console.log(res.locals.season)
    res.status(200).json({ data: await service.read(req.body.data.id) });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(read)],
};