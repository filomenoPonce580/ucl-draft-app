exports.up = function(knex) {
    return knex.schema.createTable("seasons", (table) => {
        table.increments("id").primary();
        table.string("season").notNullable();
        table.specificType("teamIds", "integer[]");
        table.timestamps(true, true);
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("seasons");
};
