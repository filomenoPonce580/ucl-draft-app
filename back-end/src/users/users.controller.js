const service = require("./users.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

// Application Middleware/Validators
const hasRequiredProperties = hasProperties("name", "team1", "team2", "team3", "team4");

function validateHasOnlyCorrectProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !VALID_PROPERTIES.includes(field)
  );

  if (invalidFields.length) {
    return next({
      status: 400,
      message: `Invalid field(s): ${invalidFields.join(", ")}`,
    });
  } else {
    next();
  }
}

function validateBodyHasData(req, res, next) {
  const data = req.body.data;
  if (!data) {
    return next({
      status: 400,
      message: `Request body must have data.`,
    });
  } else {
    next();
  }
}

async function validateUserExists(req, res, next) {
  const user = await service.read(req.params.userId);
  if (user) {
    res.locals.user = user;
    return next();
  }
  next({
    status: 404,
    message: `User ID ${req.params.userId} cannot be found.`,
  });
}

// RESTful API Functions
async function list(req, res) {
  res.json({ data: await service.list() });
}

async function create(req, res) {
  const newUser = ({
    name,
    team1,
    team2,
    team3,
    team4
  } = req.body.data)
  const createdUser = await service.create(req.body.data)
  res.status(201).json({ data: createdUser});
}


async function read(req, res, next) {
  res.status(200).json({ data: res.locals.habit });
}

async function update(req, res, next) {
  const updatedHabit = {
    ...req.body.data,
    habit_id: res.locals.habit.habit_id,
  };
  res.json({ data: await service.update(updatedHabit) });
}

module.exports = {
  list: asyncErrorBoundary(list),
  createNewHabit: [
    validateBodyHasData,
    validateHasOnlyCorrectProperties,
    validateHasRequiredProperties,
    validateHabitNameProperty,
    validateCategoryProperty,
    validateDifficultyProperty,
    asyncErrorBoundary(createNewHabit),
  ],
  createNewHistory: [
    validateBodyHasData,
    validateHabitExists,
    validateHistoryHasOnlyCorrectProperties,
    validateEventId,
    validateCategoryId,
    asyncErrorBoundary(createNewHistory),
  ],
  read: [asyncErrorBoundary(validateUserExists), asyncErrorBoundary(read)],
};
