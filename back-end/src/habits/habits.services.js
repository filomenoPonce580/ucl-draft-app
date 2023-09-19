const knex = require("../db/connection");

//returns the reservation that matched the given reservation id
function read(habitId) {
  return knex("tblHabit").select("*").where({ habit_id: habitId }).first();
}

// returns all habits with the given date with all fields
function list() {
  return knex("tblHabit").select("*").where({ isActive: true });
}

// return the pushed new reservation to the database and updates the created records
function createNewHabit(habit) {
  return knex("tblHabit")
    .insert(habit)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

//Create a new record in tblHistory when the habit + or - button is pressed
function createNewHistory(history) {
  return knex("tblHistory")
    .insert(history)
    .returning("*")
    .then((createdRecords) => createdRecords[0]);
}

//returns the updated habit
function update(habit) {
  return knex("tblHabit")
    .select("*")
    .where({ habit_id: habit.habit_id })
    .update(habit, "*")
    .then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
  read,
  list,
  createNewHabit,
  createNewHistory,
  update,
};
