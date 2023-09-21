const service = require("./users.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");

// Application Middleware/Validators
const hasRequiredProperties = hasProperties("name", "team1", "team2", "team3", "team4");

// function validateHasOnlyCorrectProperties(req, res, next) {
//   const { data = {} } = req.body;

//   const invalidFields = Object.keys(data).filter(
//     (field) => !VALID_PROPERTIES.includes(field)
//   );

//   if (invalidFields.length) {
//     return next({
//       status: 400,
//       message: `Invalid field(s): ${invalidFields.join(", ")}`,
//     });
//   } else {
//     next();
//   }
// }

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

async function validateName(req, res, next){
  const name = req.body.data.name;

  if( name.length > 30){
    next({
      status: 400,
      message: `Name must be shorter than 30 characters`
    })
  }else{
    next()
  }
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

async function update(req, res, next) {
  const updatedInfo = req.body.data

  const oldUserData = res.locals.reservation
  const updatedUser = {
    ...oldUserData,
    ...updatedInfo 
  }

  await service.update(updatedUser)

  const update = await service.read(user.userId)
  const data = update

  res.status(200).json({ data })
}


async function read(req, res, next) {
  res.status(200).json({ data: res.locals.user });
}

async function update(req, res, next) {
  const updatedUser = {
    ...req.body.data,
    userId: res.locals.user.userId,
  };
  res.json({ data: await service.update(updatedUser) });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    //validateBodyHasData,
    //validateHasOnlyCorrectProperties,
    hasRequiredProperties,
    asyncErrorBoundary(create),
  ],
  updateUser: [
    asyncErrorBoundary(validateBodyHasData),
    asyncErrorBoundary(validateUserExists),
    hasRequiredProperties,
    asyncErrorBoundary(update)
  ],
  read: [asyncErrorBoundary(validateUserExists), asyncErrorBoundary(read)],
};
