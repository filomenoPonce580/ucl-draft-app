const service = require("./teams.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

// Application Middleware/Validators

// RESTful API Functions
async function list(req, res) {
    res.json({ data: await service.list() });
}

module.exports = {
    list: asyncErrorBoundary(list),
    // create: [
    //   //validateBodyHasData,
    //   //validateHasOnlyCorrectProperties,
    //   hasRequiredProperties,
    //   asyncErrorBoundary(create),
    // ],
    // updateUser: [
    //   asyncErrorBoundary(validateBodyHasData),
    //   asyncErrorBoundary(validateUserExists),
    //   hasRequiredProperties,
    //   asyncErrorBoundary(update)
    // ],
    // read: [asyncErrorBoundary(validateUserExists), asyncErrorBoundary(read)],
};