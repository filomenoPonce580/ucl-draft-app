exports.up = function (knex) {
    return knex.schema.createTable("users", (table) => {
        table.increments("userId").primary();
        table.string("name").notNullable();
        table.specificType("leagueIds", "integer[]");
        table.timestamps(true, true);
      });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("users");
  };
