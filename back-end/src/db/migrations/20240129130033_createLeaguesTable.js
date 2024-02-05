exports.up = function (knex) {
  return knex.schema
    .createTable("leagues", (table) => {
      table.increments("leagueId").primary();
      table.string("name").notNullable();
      table.integer("user1").notNullable();
      table.specificType("user1teams", "integer[]");
      table.integer("user2").notNullable();
      table.specificType("user2teams", "integer[]");
      table.integer("user3");
      table.specificType("user3teams", "integer[]");
      table.integer("user4");
      table.specificType("user4teams", "integer[]");
      table.integer("user5");
      table.specificType("user5teams", "integer[]");
      table.integer("user6");
      table.specificType("user6teams", "integer[]");
      table.integer("user7");
      table.specificType("user7teams", "integer[]");
      table.integer("user8");
      table.specificType("user8teams", "integer[]");
      table.integer("seasonId").notNullable().unsigned();
      table.foreign("seasonId").references("seasons.id").onDelete('CASCADE'); // Added onDelete
      table.timestamps(true, true);
    })
};

exports.down = function (knex) {
  return knex.schema.dropTable("users").dropTable("leagues");
};