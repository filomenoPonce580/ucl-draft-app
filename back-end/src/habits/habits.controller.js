const service = require("./habits.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

// Application Middleware/Validators
const validateHasRequiredProperties = hasProperties(
  "category_id",
  "habit_name",
  "habit_description",
  "isActive",
  "difficulty"
);

const VALID_PROPERTIES = [
  "category_id",
  "habit_name",
  "habit_description",
  "isActive",
  "difficulty",
];

const HISTORY_VALID_PROPERTIES = [
  "user_id",
  "category_id",
  "event_id",
  "habit_id",
  "event_name",
  "completionDate",
];

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

function validateHabitNameProperty(req, res, next) {
  const { habit_name } = req.body.data;
  if (habit_name.trim()) {
    next();
  } else {
    return next({
      status: 400,
      message: `"habit_id" cannot be NULL.`,
    });
  }
}

function validateCategoryProperty(req, res, next) {
  const { category_id } = req.body.data;
  if (typeof category_id == "number") {
    next();
  } else {
    return next({
      status: 400,
      message: `"category_id" must be a number`,
    });
  }
}

function validateDifficultyProperty(req, res, next) {
  const { difficulty } = req.body.data;
  if (typeof difficulty == "number") {
    next();
  } else {
    return next({
      status: 400,
      message: `"difficulty" must be a number`,
    });
  }
}

async function validateHabitExists(req, res, next) {
  const habit = await service.read(req.params.habit_id);
  if (habit) {
    res.locals.habit = habit;
    return next();
  }
  next({
    status: 404,
    message: `Habit ID ${req.params.habit_id} cannot be found.`,
  });
}

//Validates history contains all properties needed to create a new record
function validateHistoryHasOnlyCorrectProperties(req, res, next) {
  const { data = {} } = req.body;

  const invalidFields = Object.keys(data).filter(
    (field) => !HISTORY_VALID_PROPERTIES.includes(field)
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

//validates event id is between hard-set categories in database
function validateEventId(req, res, next) {
  const validStatus = [1, 2, 3];
  const eventId = req.body.data?.event_id;

  if (!validStatus.includes(eventId)) {
    return next({
      status: 400,
      message: "Event_Id cannot be unknown.",
    });
  }

  res.locals.eventId = eventId;
  next();
}

//validates category id is between hard-set categories in database
function validateCategoryId(req, res, next) {
  const validStatus = [1, 2, 3, 4, 5, 6, 7, 8];
  const categoryId = req.body.data?.category_id;

  if (!validStatus.includes(categoryId)) {
    return next({
      status: 400,
      message: "Category_Id cannot be unknown.",
    });
  }

  res.locals.categoryId = categoryId;
  next();
}

// RESTful API Functions
async function list(req, res) {
  res.json({ data: await service.list() });
}

async function createNewHabit(req, res) {
  res.status(201).json({ data: await service.createNewHabit(req.body.data) });
}

async function createNewHistory(req, res) {
  res.status(201).json({ data: await service.createNewHistory(req.body.data) });
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
  read: [asyncErrorBoundary(validateHabitExists), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(validateHabitExists),
    validateBodyHasData,
    validateHasRequiredProperties,
    validateHabitNameProperty,
    validateCategoryProperty,
    validateDifficultyProperty,
    asyncErrorBoundary(update),
  ],
};
