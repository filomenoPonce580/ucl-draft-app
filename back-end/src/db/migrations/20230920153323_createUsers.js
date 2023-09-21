exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
      table.increments("userId").primary();
      table.string("name");
      table.string("team1");
      table.string("team2");
      table.string("team3");
      table.string("team4");
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("users");
  };