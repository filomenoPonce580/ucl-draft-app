exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
      table.increments("userId").primary();
      table.string("name");
      table.integer("team1");
      table.integer("team2");
      table.integer("team3");
      table.integer("team4");
      table.timestamps(true, true);
    });
};
  
exports.down = function (knex) {
    return knex.schema.dropTable("users");
};